#!/var/www/html/python3_11/bin/python3.11

import logging
import swagger_client
import time
import ospi_defs

# swagger_client seems to be hard coded for weatherapi.com
# Based on the "Zimmerman" method described at "github.com/rszimm/sprinklers_pi/wiki/Weather-adjustments"
# Described method seems to compute adjustment based on prior two days.   Problem
# with this is it doesn't take current weather into account.   Don't want to water if its gonna 
# rain today.   At the risk of believing the forcast, we'll compute an adjustment based
# on yesterdays reported values and today's predictions.
#
# 4/20/24 update.   Fetches of yesterdday's weather quit working.  I filed a ticket and Weatherapi responded!   
# Tried again, and it is now working.

class ospi_weather():

    def __init__ (self, ospi_db, wl_update):
        self.ospi_db = ospi_db
        self.wl_update = wl_update
        self.logger = logging.getLogger(__name__)

    def initialize(self) :
        self.configuration = swagger_client.Configuration()
        self.configuration.api_key['key'] = self.ospi_db.db["debug"]["weatherapi.com_key"]
        self.api_instance = swagger_client.APIsApi(swagger_client.ApiClient(self.configuration))
        self.fetch_daily_wx()

    def fetch_daily_wx(self):
        ts = self.ospi_db.get_utc_stamp(self.logger)
        yesterday =  time.strftime("%Y-%m-%d", time.localtime(ts - ospi_defs.SECS_PER_DAY))
        today = time.strftime("%Y-%m-%d", time.localtime(ts))
        zipcode = "80528"
#        print (self.api_instance.history_weather(zipcode, yesterday))
#        print (self.api_instance.forecast_weather(zipcode, 1, dt=today))
        avghumidity = 0
        avgtemp_f = 0
        self.totalprecip_hundreds = 0
        wx_factors = 0
        try:
            wx_yesterday = self.api_instance.history_weather(zipcode, yesterday)["forecast"]["forecastday"][0]["day"]
            avghumidity = wx_yesterday["avghumidity"] 
            avgtemp_f = wx_yesterday["avgtemp_f"] 
            self.totalprecip_hundreds = wx_yesterday["totalprecip_in"] 
            wx_factors = 1
        except Exception as e:
# nominally expect index error because the fetch succeeds, but does not return the expected dict.
            self.logger.error (f'\n    failed fetch of yesterdays weather: {type(e)}\n')

        try:
            wx_today = self.api_instance.forecast_weather(zipcode, 1, dt=today)["forecast"]["forecastday"][0]["day"]
            avghumidity += wx_today["avghumidity"] 
            avgtemp_f += wx_today["avgtemp_f"] 
            self.totalprecip_hundreds += wx_today["totalprecip_in"] 
            wx_factors += 1
        except Exception as e:
            self.logger.error (f'\n    failed fetch of yesterdays weather: {e}\n')

        self.avghumidity, self.avgtemp_f = self.get_neutral_values() 

        if wx_factors != 0 :
            self.avghumidity = avghumidity/wx_factors
            self.avgtemp_f = avgtemp_f/wx_factors

        self.compute_adjustment()

    def get_neutral_values(self):
        if "bh" in self.ospi_db.db["settings"]["wto"]:
            neutral_humidity = self.ospi_db.db["settings"]["wto"]["bh"]
        else :
            neutral_humidity = ospi_defs.NEUTRAL_HUMIDITY

        if "bt" in self.ospi_db.db["settings"]["wto"]:
            neutral_temp = self.ospi_db.db["settings"]["wto"]["bt"]
        else :
            neutral_temp = ospi_defs.NEUTRAL_TEMP

        return (neutral_humidity, neutral_temp) 

    def compute_adjustment(self):

        neutral_humidity, neutral_temp = self.get_neutral_values() 

        if "t" in self.ospi_db.db["settings"]["wto"]:
            temp_scale = self.ospi_db.db["settings"]["wto"]["t"]
        else :
            temp_scale = 100

        if "h" in self.ospi_db.db["settings"]["wto"]:
            hum_scale = self.ospi_db.db["settings"]["wto"]["h"]
        else :
            hum_scale = 100

        if "r" in self.ospi_db.db["settings"]["wto"]:
            precip_scale = self.ospi_db.db["settings"]["wto"]["r"]
        else :
            precip_scale = 100


        hum_factor = (neutral_humidity - self.avghumidity) * hum_scale/100
        temp_factor = (self.avgtemp_f - neutral_temp) * 4 * temp_scale/100

        precip_factor = (self.totalprecip_hundreds * -2) * precip_scale/100

        self.logger.debug(f'\n    avghumidity: {self.avghumidity}, avgtemp: {self.avgtemp_f}, ' + \
                          f'totalprecip_hundreds: {self.totalprecip_hundreds}\n')
        self.logger.debug(f'\n    hum_factor: {hum_factor}, temp_factor: {temp_factor}, ' + \
                          f'precip_factor: {precip_factor}\n')

        adj = int(min(max(0,100+hum_factor+temp_factor+precip_factor), 200))
        self.logger.debug(f'\n   computed adjustment: {adj}\n')

        self.ospi_db.db["debug"]["zimm"] = adj

        self.wl_update.update()
        
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

    ospi_db_i.db["options"]["uwt"] = 1

    from ospi_wl_update import ospi_wl_update
    wl = ospi_wl_update(ospi_db_i)

    wx = ospi_weather(ospi_db_i, wl.update)
    wx.initialize()

    wx.avghumidity, wx.avgtemp_f = wx.get_neutral_values() 
    wx.compute_adjustment ()

    ospi_db_i.db["settings"]["wto"]["bt"] = 80
    wx.compute_adjustment()

    ospi_db_i.db["settings"]["wto"]["t"] = 80
    wx.compute_adjustment()

    ospi_db_i.db["settings"]["wto"]["bt"] = ospi_defs.NEUTRAL_TEMP
    ospi_db_i.db["settings"]["wto"]["t"] = 100
    
    ospi_db_i.db["settings"]["wto"]["bh"] = 20
    wx.compute_adjustment()

    ospi_db_i.db["settings"]["wto"]["h"] = 110
    wx.compute_adjustment()
  


