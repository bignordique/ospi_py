#!/var/www/html/python3_11/bin/python3.11
import logging
from cron_entry import cron_entry
from datetime import datetime
from dateutil import tz
from ospi_sunrise_sunset import ospi_sunrise_sunset
import ospi_defs

class ospi_tasks_midnight(cron_entry):

    def __init__(self, ospi_db, prune_log, compute_daily_adjustment):
        super().__init__("midnight",  "* 0 * * *", self.run_tasks)
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.sr_ss = ospi_sunrise_sunset(ospi_db)
        self.prune_log = prune_log
        self.compute_daily_adjustment = compute_daily_adjustment


    def run_tasks(self):
        self.sr_ss.update()
        self.prune_log(self.ospi_db.get_utc_stamp(self.logger) - ospi_defs.SECS_PER_DAY * 7)
        self.compute_daily_adjustment()


if __name__ == "__main__":

    import os

    LOGFILE = "test/log"
    try :
        os.remove(LOGFILE)
    except: OSError:any
  
    DBFILE = "test/db_file"
    try :
        os.remove(DBFILE)
    except: OSError:any

    DEFFILE = "config/ospi_defaults.txt"   

    import time
    from logging.handlers import RotatingFileHandler
    logging.basicConfig(format='%(asctime)s %(module)s %(levelname)s:%(message)s', 
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=1)],
                        level=logging.DEBUG)

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    def fake_log(fake):
        pass

    from ospi_weather import ospi_weather
    wx = ospi_weather(ospi_db_i)

    midnight = ospi_tasks_midnight(ospi_db_i, fake_log, wx.compute_daily_adjustment)

    for ii in range(0,10):
        midnight.run_tasks()
        time.sleep(2)