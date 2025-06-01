
import logging
import time
import ospi_defs
from gpiozero import Button

# Think its 10 clicks per gallon.
# increment ospi_db["settings"]["wm_clicks"] with each click. 
# To decrease disk traffic, don't flush.  wm_clicks doesn't have to perfect.

class ospi_water_meter():
    
    def __init__(self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        pin = ospi_defs.WM_GPIO_PIN
        self.button = Button(pin, active_state=True, pull_up=None, hold_time=0.1)
        self.timestamps = []
        self.timestamps = [0.0 for ii in range(ospi_defs.WM_TS_DEPTH)]
        self.nozone_stamps = []
        self.button.when_held = self.click

    def init_clicks(self):
        self.wm_clicks = self.ospi_db.db["settings"]["wm_clicks"]
        self.wm_timestamp = self.ospi_db.db["settings"]["wm_timestamp"]

    def compute_gpm(self):
        period = self.ospi_db.db["settings"]["flwrt"]
        clicks = 0
        last_period = time.time() - period
        for ii in self.timestamps:
            if ii >= last_period:
                clicks += 1
        self.ospi_db.db["settings"]["flcrt"] = clicks
        ts_int = int(self.ospi_db.db["settings"]["wm_timestamp"])
        readable_time = time.strftime("%Y/%m/%d-%H:%M:%S",time.gmtime(ts_int))
        self.logger.debug(f'\n    clicks in last {period} seconds: {clicks}' +\
                          f'\n    wm_timestamp: {readable_time} ' +\
                          f'wm_clicks: {self.ospi_db.db["settings"]["wm_clicks"]}\n')

    def click(self):
        self.timestamps = [time.time()] + self.timestamps[0:ospi_defs.WM_TS_DEPTH-1]
        self.ospi_db.db["settings"]["wm_clicks"] += 1
        self.ospi_db.db["settings"]["wm_timestamp"] = self.ospi_db.get_lcl_stamp(self.logger)
#        self.logger.info(f'\n    {self.timestamps[1]:3.2f} {self.timestamps[0]:3.2f} {self.timestamps[0]-self.timestamps[1]:3.2f}\n')
        self.logger.debug(f'\n     wm_clicks: {self.ospi_db.db["settings"]["wm_clicks"]}' + \
                         f'\n     timestamps: {self.timestamps}\n')

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

    water_meter_inst = ospi_water_meter(ospi_db_i)
    
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


