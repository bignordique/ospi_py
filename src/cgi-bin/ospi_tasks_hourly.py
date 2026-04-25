#!/var/www/html/python3_11/bin/python3.11
import logging
from cron_entry import cron_entry

class ospi_tasks_hourly(cron_entry):

    def __init__(self, ospi_os_weather_hourly):
        super().__init__("hourly",  "0 * * * *", self.run_tasks)
        self.logger = logging.getLogger(__name__)
        self.ospi_os_weather_hourly = ospi_os_weather_hourly

    def run_tasks(self):
        self.ospi_os_weather_hourly()

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

    from ospi_os_weather import ospi_os_weather
    wx = ospi_os_weather(ospi_db_i)
    wx.initialize()

    hourly = ospi_tasks_hourly(wx)

    for ii in range(0,10):
        hourly.run_tasks()
        time.sleep(2)

    wx.compute_daily_adjustment()