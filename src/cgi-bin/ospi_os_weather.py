#!/home/leith/ospi_py/.venv/bin/python

import logging
import ospi_defs
from urllib.parse import quote 
import urllib.request
import json

class ospi_os_weather():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)

    def initialize(self) :
        self.url = "https://" + self.ospi_db.db["settings"]["wsp"]+ "/weatherData?loc=" + quote(self.ospi_db.db["settings"]["loc"], safe='')
        self.temps_48h = [None] * 48
        self.hums_48h = [None] * 48
        self.precips_48h = [None] * 48
        #self.compute_daily_adjustment()

    def apply_monthly_adjustment(self):
        self.logger.debug("\n    implement apply_monthly_adjustment\n")

    def record_hourly_weather(self):
        report = json.loads(urllib.request.urlopen(self.url).read())
        self.temps_48h = [report["temp"]] + self.temps_48h[0:46]
        self.hums_48h = [report["humidity"]] + self.hums_48h[0:46]
        self.precips_48h = [report["precip"]] + self.precips_48h[0:46]
        self.logger.debug(f'\n    hourly temps: {self.temps_48h}\n    hums: {self.hums_48h}\n    precips: {self.precips_48h}\n')

    def compute_daily_adjustment(self):
        self.logger.debug(f'\n    daily temps: {self.temps_48h}\n    hums: {self.hums_48h}\n    precips: {self.precips_48h}\n')
 
 #       ts = self.ospi_db.get_utc_stamp(self.logger)


#        adj = int(min(max(0,100+hum_factor+temp_factor+precip_factor), 200))
#        self.ospi_db.db["options"]["wl"] = adj
        
if __name__ == "__main__":
    import os

    LOGFILE = "test/log"
    try :
        os.remove(LOGFILE)
    except OSError: any

    DBFILE = "test/ospi_db.json"
    try :
        os.remove(DBFILE)
    except OSError: any

    from logging.handlers import RotatingFileHandler
    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=1)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, "config/ospi_defaults.txt")

    wx = ospi_os_weather(ospi_db_i)
    wx.initialize()

    for ii in range(0,2):
        for ii in range(0, 2):
            wx.record_hourly_weather()
        wx.compute_daily_adjustment()

    #print ("water level", ospi_db_i.db["options"]["wl"])

