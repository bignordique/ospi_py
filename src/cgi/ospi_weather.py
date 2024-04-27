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

class ospi_weather():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)

    def initialize(self) :
        self.configuration = swagger_client.Configuration()
        self.configuration.api_key['key'] = self.ospi_db.db["debug"]["weatherapi.com_key"]
        self.api_instance = swagger_client.APIsApi(swagger_client.ApiClient(self.configuration))
        self.compute_daily_adjustment()

    def apply_monthly_adjustment(self):
        self.logger.debug("\n    implement apply_monthly_adjustment\n")

    def compute_daily_adjustment(self):
        ts = self.ospi_db.get_utc_stamp(self.logger)
        yesterday =  time.strftime("%Y-%m-%d", time.localtime(ts - ospi_defs.SECS_PER_DAY))
        today = time.strftime("%Y-%m-%d", time.localtime(ts))
        zipcode = "80528"
        wx_yesterday = self.api_instance.history_weather(zipcode, yesterday)["forecast"]["forecastday"][0]["day"]
        wx_today = self.api_instance.forecast_weather(zipcode, 1, dt=today)["forecast"]["forecastday"][0]["day"]

        avghumidity = (wx_yesterday["avghumidity"] + wx_today["avghumidity"])/2
        hum_factor = ospi_defs.NEUTRAL_HUMIDITY - avghumidity

        avgtemp_f = (wx_yesterday["avgtemp_f"] + wx_today["avgtemp_f"])/2
        temp_factor = (avgtemp_f - ospi_defs.NEUTRAL_TEMP) * 4

        totalprecip_hundreds = (wx_yesterday["totalprecip_in"] + wx_today["totalprecip_in"]) * 100
        precip_factor = totalprecip_hundreds * -2

#        print(avghumidity, avgtemp_f, totalprecip_hundreds)
#        print(hum_factor, temp_factor, precip_factor)

        adj = int(min(max(0,100+hum_factor+temp_factor+precip_factor), 200))
        self.ospi_db.db["options"]["wl"] = adj
        
if __name__ == "__main__":

    from logging.handlers import RotatingFileHandler

    LOGFILE = "test/log"

    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=1)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    from ospi_db import ospi_db

    ospi_db_i = ospi_db()
    ospi_db_i.init_db("test/db_file", "config/ospi_defaults.txt")

    wx = ospi_weather(ospi_db_i)
    wx.initialize()

    wx.compute_daily_adjustment()

    print (ospi_db_i.db["options"]["wl"])

