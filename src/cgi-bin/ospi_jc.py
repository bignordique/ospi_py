#!/var/www/html/python3_11/bin/python3.11

import json
import logging
import re
import copy
import time

class ospi_jc():

    def __init__ (self, ospi_db, eng):
        self.ospi_db = ospi_db
        self.eng = eng
        self.logger = logging.getLogger(__name__)

    def handle(self):
        settings = copy.copy(self.ospi_db.db["settings"])
        settings["devt"] = self.ospi_db.get_lcl_stamp(self.logger)
        settings["rdst"] = settings["rdst"] + time.localtime().tm_gmtoff
        settings["sbits"] = self.eng.get_sbits()
        settings["ps"] = self.eng.get_ps()
        settings["nq"] = self.eng.nqueue
        settings["pq"] = 1 if self.eng.pause_state else 0
        settings["pt"] = self.eng.pause_timer
        self.logger.debug(f'\n    {settings}\n')
        return[json.dumps(settings)]


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

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    from ospi_check_match import ospi_check_match
    from ospi_station_bits import ospi_station_bits
    from ospi_weather import ospi_weather
    from ospi_engine import ospi_engine
    cm = ospi_check_match(ospi_db_i)
    sb = ospi_station_bits(ospi_db_i)
    wx = ospi_weather()
    eng = ospi_engine(ospi_db_i, cm, sb, wx)

    jc = ospi_jc(ospi_db_i, eng)

#nominal
    print(jc.handle())

