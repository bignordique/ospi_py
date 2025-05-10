#!/var/www/html/python3_11/bin/python3.11

# get status /js?pw
import json
import logging
import copy

class ospi_js():

    def __init__ (self, ospi_db, sb, fuse, wm):
        self.ospi_db = ospi_db
        self.sb = sb
        self.fuse = fuse
        self.wm = wm
        self.logger = logging.getLogger(__name__)
        self.ospitemp = "undefined"
        self.acvolts = "undefined"
        self.gpm = "undefined"

    def handle(self):
        statusdict = copy.copy(self.ospi_db.db["status"])
        statusdict["gpm"] = self.wm.compute_gpm()
        statusdict["ospitemp"] = self.ospitemp
        statusdict["acvolts"] = self.acvolts
        statusdict["fuse"] = "FUSE" if self.fuse.get_fuse() == "blown" else ""
        statusdict["sn"] = self.sb.sn()
        self.logger.debug(f'\n    {statusdict}\n')
        return[json.dumps(statusdict)]

    def settemp(self, temp):
        self.ospitemp = temp

    def setac(self, ac):
        self.acvolts = ac

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

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    from ospi_station_bits import ospi_station_bits
    sb = ospi_station_bits(ospi_db_i)
    
    from ospi_fuse import ospi_fuse
    fuse = ospi_fuse()

    from ospi_water_meter import ospi_water_meter
    wm = ospi_water_meter(ospi_db_i)

    js = ospi_js(ospi_db_i, sb, fuse, wm)

#nominal
    print(js.handle())
    js.settemp("22.1")
    print(js.handle())
    js.setac("12")
    print(js.handle())

