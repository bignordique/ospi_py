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
        self.get_weather()
        #self.compute_daily_adjustment()

    def get_weather(self):
        self.ospi_db.db["settings"]["lwc"] = self.ospi_db.get_lcl_stamp(self.logger)
        self.ospi_db.db["settings"]["wtdata"]["h"]= ""
        self.ospi_db.db["settings"]["wtdata"]["t"]= ""
        self.ospi_db.db["settings"]["wtdata"]["p"]= ""
        self.ospi_db.db["settings"]["wtdata"]["minT"]= ""
        self.ospi_db.db["settings"]["wtdata"]["maxT"]= ""
        self.ospi_db.db["settings"]["wtdata"]["wind"]= ""
        try:
            report = json.loads(urllib.request.urlopen(self.url).read())
            self.ospi_db.db["settings"]["lswc"] = self.ospi_db.get_lcl_stamp(self.logger)
            self.ospi_db.db["settings"]["wterr"] = 0
        except Exception as e:
            self.ospi_db.db["settings"]["wterr"] = 1
            self.ospi_db.db["settings"]["lswc"] = 0
            self.logger.error(f'\n    weather data retrieval failed: {e}\n')
            return None
        self.ospi_db.db["settings"]["wtdata"]["h"]= report["humidity"]
        self.ospi_db.db["settings"]["wtdata"]["t"]= report["temp"]
        self.ospi_db.db["settings"]["wtdata"]["p"]= report["precip"]
        self.ospi_db.db["settings"]["wtdata"]["minT"]= report["minTemp"]
        self.ospi_db.db["settings"]["wtdata"]["maxT"]= report["maxTemp"]
        self.ospi_db.db["settings"]["wtdata"]["wind"]= report["wind"]
        self.ospi_db.wb_db(self.logger)
        return report

    def apply_monthly_adjustment(self):
        self.logger.debug("\n    implement apply_monthly_adjustment\n")

    def record_hourly_weather(self):
        report = self.get_weather()
        if report is not None:
            self.temps_48h = [report["temp"]] + self.temps_48h[0:46]
            self.hums_48h = [report["humidity"]] + self.hums_48h[0:46]
            self.precips_48h = [report["precip"]] + self.precips_48h[0:46]
            self.logger.debug(f'\n    hourly temps: {self.temps_48h}\n    hums: {self.hums_48h}\n    precips: {self.precips_48h}\n')

    def compute_daily_adjustment(self):
        temps_cumulative = 0
        hums_cumulative = 0
        count = 0
        for ii in range(0, 47):
            if self.temps_48h[ii] is not None:
                temps_cumulative += self.temps_48h[ii] or 0
                hums_cumulative += self.hums_48h[ii] or 0
                count += 1

        # Don't know for sure where the boundary between days is.   Weather server clock may
        # not be exactly in sync with ospi clock. 
        day1_precip = max(self.precips_48h[22] or 0, self.precips_48h[23] or 0) 
        day2_precip = max(self.precips_48h[46] or 0, self.precips_48h[46] or 0) 
        
        if count == 48:
            temp_average = int((temps_cumulative / 48)*10)/10
            hums_average = hums_cumulative // 48
            precip = day1_precip + day2_precip
        else:
            if "bt" in self.ospi_db.db["settings"]["wto"] :
                temp_average = self.ospi_db.db["settings"]["wto"]["bt"]
            else: temp_average = 70
            if "bh" in self.ospi_db.db["settings"]["wto"] :
                hums_average = self.ospi_db.db["settings"]["wto"]["bh"]
            else: hums_average = 30
            if "br" in self.ospi_db.db["settings"]["wto"] :
                precip = self.ospi_db.db["settings"]["wto"]["br"]
            else: precip = 0

        self.logger.debug(f'\n    {precip=} {temp_average=} {hums_average=}\n')
 
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

    """
    {'timezone': -360, 'sunrise': 366, 'sunset': 1191, 'weatherProvider': 'Apple', 'temp': 47, 'humidity': 55, 'wind': 5, 'raining': False, 
     'description': 'Cloudy', 'icon': '03d', 'region': '', 'city': '', 'minTemp': 36, 'maxTemp': 54, 'precip': 0.07244094488160001, 
     'forecast': [
        {'temp_min': 36, 'temp_max': 54, 'precip': 0.07244094488160001, 'date': 1777183200, 'icon': '10d', 'description': 'Drizzle'},  #timestap today at 12AM
        {'temp_min': 39, 'temp_max': 57, 'precip': 0.133858267716, 'date': 1777269600, 'icon': '10d', 'description': 'Rain'},
        {'temp_min': 39, 'temp_max': 60, 'precip': 0.0185039370078, 'date': 1777356000, 'icon': '10d', 'description': 'Drizzle'}, 
        {'temp_min': 37, 'temp_max': 64, 'precip': 0, 'date': 1777442400, 'icon': '02n', 'description': 'PartlyCloudy'}, 
        {'temp_min': 39, 'temp_max': 53, 'precip': 0.5913385826748, 'date': 1777528800, 'icon': '10d', 'description': 'Rain'}, 
        {'temp_min': 37, 'temp_max': 53, 'precip': 0.1728346456686, 'date': 1777615200, 'icon': '10d', 'description': 'Drizzle'},
        {'temp_min': 34, 'temp_max': 64, 'precip': 0.06102362204700001, 'date': 1777701600, 'icon': '02n', 'description': 'MostlyClear'}, 
        {'temp_min': 39, 'temp_max': 69, 'precip': 0, 'date': 1777788000, 'icon': '02n', 'description': 'MostlyClear'}, 
        {'temp_min': 44, 'temp_max': 60, 'precip': 0, 'date': 1777874400, 'icon': '03d', 'description': 'MostlyCloudy'},
        {'temp_min': 36, 'temp_max': 64, 'precip': 0, 'date': 1777960800, 'icon': '02n', 'description': 'PartlyCloudy'}],
        'ttl': 14442419, 'location': [40.44984, -105.00539]} """

