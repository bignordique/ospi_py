#!/var/www/html/python3_11/bin/python3.11
from astral import LocationInfo, sun
from datetime import date, time, datetime
import logging
from ospi_db import ospi_db

#need to make this work with programmable cities

class ospi_sunrise_sunset (ospi_db):

    def update(self):
        if date.today() != self.lastrun:
            self.lastrun = date.today()
            s = sun.sun(self.city.observer, date.today())
            midnight = datetime.combine(datetime.today(), time.min).timestamp()
#        midnight = datetime.combine(datetime.today(), time(1,0)).timestamp()
            ospi_db.db["settings"]["sunrise"] = int((s["sunrise"].timestamp() - midnight)/60)
            ospi_db.db["settings"]["sunset"] = int((s["sunset"].timestamp() - midnight)/60)
            self.logger.debug(f'\n   sunrise: {ospi_db.db["settings"]["sunrise"]}' +
                              f' sunset: {ospi_db.db["settings"]["sunset"]}\n')
            self.wb_db(self.logger)

    def __init__(self):
        self.city = LocationInfo("Fort Collins", "America", "America/Denver", 40.58, -105.08)
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
                                                      backupCount=1)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    sr_ss = ospi_sunrise_sunset()

#nominal

    sr_ss.update()

    print (ospi_db.db["settings"]["sunrise"], ospi_db.db["settings"]["sunset"])
