
import logging
import time 
import ospi_defs
from gpiozero import Button
from threading import Timer

# Think its 10 clicks per gallon.
# increment ospi_db["settings"]["wm_clicks"] with each click. 
# To decrease disk traffic, don't flush.  wm_clicks doesn't have to perfect.

class ospi_water_meter():
    
    def __init__(self, ospi_db, eng, sb, ol):
        self.ospi_db = ospi_db
        self.sb = sb
        self.eng = eng
        self.ol = ol
        self.logger = logging.getLogger(__name__)
        pin = ospi_defs.WM_GPIO_PIN
        self.button = Button(pin, active_state=True, pull_up=None, bounce_time=0.001)
        self.timestamps = [0.0 for ii in range(ospi_defs.WM_TS_DEPTH)]
        self.nozone_stamps = []
        self.button.when_pressed = self.click
        self.nozone_timer = None

    def init_clicks(self):
        self.wm_clicks = self.ospi_db.db["settings"]["wm_clicks"]
        self.wm_timestamp = self.ospi_db.db["settings"]["wm_timestamp"]

    def compute_gpm(self):
        period = self.ospi_db.db["settings"]["flwrt"]
        clicks = 0
        last_period = self.ospi_db.get_lcl_stamp(self.logger) - period
        for ii in self.timestamps:
            if ii >= last_period:
                clicks += 1
        self.ospi_db.db["settings"]["flcrt"] = clicks
        ts_int = int(self.ospi_db.db["settings"]["wm_timestamp"])
        readable_time = time.strftime("%Y/%m/%d-%H:%M:%S",time.gmtime(ts_int))
        self.logger.debug(f'\n    clicks in last {period} seconds: {clicks}' +\
                          f'\n    wm_timestamp: {readable_time} ' +\
                          f'wm_clicks: {self.ospi_db.db["settings"]["wm_clicks"]}\n')

    def ts_show_diff(self):
        string_out = ""
        for ii in range(ospi_defs.WM_TS_DEPTH - 1):
            string_out += f'{self.timestamps[ii]} {self.timestamps[ii+1]} {self.timestamps[ii] - self.timestamps[ii+1]}\n'
        return string_out
    
    def click(self):
        # get_lcl_stamp returns seconds since the "local" epoch as an integer.
        time_is = self.ospi_db.get_lcl_stamp(self.logger)
        self.timestamps = [time_is] + self.timestamps[0:ospi_defs.WM_TS_DEPTH-1]
        self.ospi_db.db["settings"]["wm_clicks"] += 1
        self.ospi_db.db["settings"]["wm_timestamp"] = time_is
#        self.logger.info(f'\n    {self.timestamps[1]:3.2f} {self.timestamps[0]:3.2f} {self.timestamps[0]-self.timestamps[1]:3.2f}\n')
        self.logger.debug(f'\n     wm_clicks: {self.ospi_db.db["settings"]["wm_clicks"]}' + \
#                          f'\n     timestamps: {self.timestamps}\n')
                          self.ts_show_diff())
        if self.sb.station_bits == 0 and self.eng.shut_off_timer == 0:
            self.nozone_stamps = [time_is] + self.nozone_stamps
            if isinstance(self.nozone_timer, Timer):
                self.nozone_timer.cancel()
            self.nozone_timer = Timer(ospi_defs.WM_NOZONE_TO, self.log_nozone)
            self.nozone_timer.start()

    def log_nozone(self):
        self.logger.info(f'\n    in log_nozone\n')
        last_stamp = self.nozone_stamps[0]
        first_stamp = self.nozone_stamps[-1]
        duration = last_stamp - first_stamp
        clicks = len(self.nozone_stamps)

        self.ol.write_log (f'100,23,{duration}', last_stamp)
        self.ol.write_log (f'100,"fl",{duration}', self.ospi_db.get_lcl_stamp(self.logger),clicks)
        self.nozone_stamps = []


if __name__ == "__main__" :

    import os
    LOGFILE = "test/log"
    try :
        os.remove(LOGFILE)
    except: OSError:any
  
    DBFILE = "test/db_file"
    try :
        os.remove(DBFILE)
    except: OSError:any

    from logging.handlers import RotatingFileHandler
    rot_handler = RotatingFileHandler(LOGFILE, maxBytes=30000, backupCount=1)
    logging.basicConfig(format="%(asctime)s %(name)s %(module)s:%(lineno)d "+\
                               "%(levelname)s:%(message)s",
                        handlers = [rot_handler],
                        level=logging.DEBUG) 
    logging.getLogger(__name__)
    logging.info("\n    Startup\n")

    DEFFILE = "config/ospi_defaults.txt"
    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    from ospi_station_bits import ospi_station_bits
    from ospi_weather import ospi_weather
    from ospi_check_match import ospi_check_match
    from ospi_log import ospi_log
    from ospi_wl_update import ospi_wl_update
    sb = ospi_station_bits(ospi_db_i)
    cm = ospi_check_match(ospi_db_i)
    wl = ospi_wl_update(ospi_db_i)
    wx = ospi_weather(ospi_db_i, wl)
    ol = ospi_log(ospi_db_i)


    from ospi_engine import ospi_engine
    eng = ospi_engine(ospi_db_i, cm, sb, wx)


    water_meter_inst = ospi_water_meter(ospi_db_i, eng, sb, ol)
    
    try:
        while True:
            time.sleep(1)
            water_meter_inst.timestamps = [time.time()] + water_meter_inst.timestamps[0:ospi_defs.WM_TS_DEPTH-1]
            print(water_meter_inst.compute_gpm())
            time.sleep(5)
            water_meter_inst.timestamps = [time.time()] + water_meter_inst.timestamps[0:ospi_defs.WM_TS_DEPTH-1]
            print(water_meter_inst.compute_gpm())
            time.sleep (45)
            
    except KeyboardInterrupt:
        logging.info("\n    KeyboardInterrupt caught\n")


