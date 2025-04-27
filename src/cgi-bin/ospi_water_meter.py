
import logging
import gpiozero
from time import sleep, time
import threading
from signal import pause
import ospi_defs

# Don't understand why pull_up has to be none to set active_state(polarity)?
# active_state/polarity seems backwards to me??

class ospi_water_meter():
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.timestamps = []
        self.timestamps = [time() for ii in range(ospi_defs.WM_TS_DEPTH)]
        self.edge_thread = threading.Thread(target=self.edge, daemon=True)
        self.edge_thread.start()
        self.rate_thread = threading.Thread(target=self.rate, daemon=True)
        self.rate_thread.start()

    def edge(self):
        button = gpiozero.Button(26, active_state=True, pull_up=None, bounce_time=0.0001)
        while True:
           button.when_pressed = self.pressed
           pause

    def rate(self):
        while True:
            clicks = 0
            last_minute = time() - 60
            for ii in self.timestamps:
                if ii >= last_minute:
                    clicks += 1
            self.logger.debug(f'\n    clicks in last minute {clicks}\n')
            sleep(1)

    def pressed(self):
        self.timestamps = [time()] + self.timestamps[0:ospi_defs.WM_TS_DEPTH-1]
        self.logger.debug(f'\n    timestamps: {self.timestamps}\n')

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

    water_meter_inst = ospi_water_meter()

    try:
        while True:
            sleep(1)
    except KeyboardInterrupt:
        logging.info("\n    KeyboardInterrupt caught\n")


