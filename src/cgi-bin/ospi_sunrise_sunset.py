#!/var/www/html/python3_11/bin/python3.11
from astral import LocationInfo, sun
from datetime import date, time, datetime
import logging
from ospi_db import ospi_db
import zoneinfo

#need to make this work with programmable cities

# blah, blah.   Discovered I was not using astral correctly.   Need to include timezone info.
# but... explains the incorrect sunset time, but not the ValueError in the sun.sun call.   Implement
# protection around the call.


class ospi_sunrise_sunset (ospi_db):

    def update(self):
        if datetime.today() != self.lastrun:
            self.lastrun = datetime.today()
            midnight = datetime.combine(self.lastrun, time.min).timestamp()
            sunrise = midnight + ospi_db.db_defaults["settings"]["sunrise"] * 60
            sunset = midnight + 24*60*60 + ospi_db.db_defaults["settings"]["sunset"] * 60
            try:
                s = sun.sun(self.city.observer, datetime.date(self.lastrun), tzinfo = self.timezone)
                sunrise = s["sunrise"].timestamp()
                sunset = s["sunset"].timestamp()
            except ValueError:
                self.logger.error(f'\n    Call to astral.sun fails with ValueError\n')
            except Exception as e:
                self.logger.error(f'\n    Call to astral.sun fails with:\n' +
                                  f'    {type(e)}\n')
            ospi_db.db["settings"]["sunrise"] = int((sunrise - midnight)/60)
            ospi_db.db["settings"]["sunset"] = int((sunset - (midnight + 1440*60))/60)
            self.logger.debug(f'\n   sunrise: {ospi_db.db["settings"]["sunrise"]}' +
                              f' sunset: {ospi_db.db["settings"]["sunset"]}\n')
            self.wb_db(self.logger)

    def __init__(self):
        self.city = LocationInfo("Fort Collins", "America", "America/Denver", 40.58, -105.08)
        self.timezone = zoneinfo.ZoneInfo("America/Denver")
        self.logger = logging.getLogger(__name__)
        self.lastrun = ""


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

    from logging.handlers import RotatingFileHandler

    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=5)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    sr_ss = ospi_sunrise_sunset()

#nominal

    sr_ss.update()

    print (ospi_db.db["settings"]["sunrise"], ospi_db.db["settings"]["sunset"])
