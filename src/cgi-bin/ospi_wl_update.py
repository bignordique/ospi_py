#!/home/leith/ospi_py/.venv/bin/python

import logging
import ospi_defs

class ospi_wl_update():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)

    def update(self):

        match self.ospi_db.db["options"]["uwt"]:
            case 0:    # Manual.  wl should be set by browser
                pass   
            case 1:    # Zimmerman
                self.ospi_db.db["options"]["wl"] = self.ospi_db.db["debug"]["zimm"]
            case 2:    # auto rain delay
                pass   # Well... sorta need a rain sensor.   Also, weather adjustment modes are mutually exclusive.   Would
                       # have too use this mode.. period.   Which doesn't make sense to me.
            case 3:    # eto  Requries ETO data from weather server.   Not currently implemented.
                pass
            case 4:    # Monthly adjustment.
                month_number = self.ospi_db.get_month_number(self.logger)
                self.ospi_db.db["options"]["wl"] = self.ospi_db.db["settings"]["wto"]["scales"][month_number-1]

        # We don't write wl back to disk because its volatile.   Whilst program is running any computed values will persist.
        
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

    ospi_wl_update_i = ospi_wl_update(ospi_db_i)

    ospi_db_i.db["options"]["uwt"] = 1
    ospi_db_i.db["options"]["wl"] = 14   # Browser sets this one.
    ospi_wl_update_i.update()
    print ("manual water level", ospi_db_i.db["options"]["wl"])
    ospi_db_i.db["options"]["uwt"] = 4    
    print ("monthly adjustment water level", ospi_db_i.db["options"]["wl"])

 

