
import logging
from time import time
import ospi_defs
from gpiozero import Button

# Think its 10 clicks per gallon.
# increment ospi_db["local"]["clicks"] with each click. 

class ospi_water_meter():
    
    def __init__(self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        pin = ospi_defs.WM_GPIO_PIN
        self.button = Button(pin, active_state=True, pull_up=None, bounce_time=0.0001)
        self.timestamps = []
        self.timestamps = [0.0 for ii in range(ospi_defs.WM_TS_DEPTH)]
        self.button.when_pressed = self.click

    def compute_gpm(self):
        period = self.ospi_db.db["settings"]["flwrt"]
        clicks = 0
        last_period = time() - period
        for ii in self.timestamps:
            if ii >= last_period:
                clicks += 1
        gpm = 60/period * clicks
        self.logger.debug(f'\n    clicks in last {period} seconds: {clicks} ' + \
                          f'gpm: {gpm}\n')
        return gpm

    def click(self):
        self.timestamps = [time()] + self.timestamps[0:ospi_defs.WM_TS_DEPTH-1]
        self.ospi_db.db["settings"]["wm_clicks"] += 1
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

    from time import sleep

    water_meter_inst = ospi_water_meter(ospi_db_i)
    
    try:
        while True:
            sleep(1)
            water_meter_inst.timestamps = [time()] + water_meter_inst.timestamps[0:ospi_defs.WM_TS_DEPTH-1]
            print(water_meter_inst.compute_gpm())
            sleep(5)
            water_meter_inst.timestamps = [time()] + water_meter_inst.timestamps[0:ospi_defs.WM_TS_DEPTH-1]
            print(water_meter_inst.compute_gpm())
            sleep (45)
            print(water_meter_inst.compute_gpm())
            
    except KeyboardInterrupt:
        logging.info("\n    KeyboardInterrupt caught\n")


