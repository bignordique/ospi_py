#!/var/www/html/python3_11/bin/python3.11

import json
import logging

class ospi_ja():

    def __init__ (self, jc, jp, jo, js, jn):
        self.jc = jc
        self.jp = jp
        self.jo = jo
        self.js = js
        self.jn = jn
        self.logger = logging.getLogger(__name__)

    def handle(self):
        self.logger.debug(f'\n')
        return['{"settings":'+ self.jc.handle()[0] +
               ', "programs":'+ self.jp.handle()[0] + 
               ', "options":'+ self.jo.handle()[0] +
               ', "status":'+ self.js.handle()[0] +
               ', "stations":'+ self.jn.handle()[0] + '}']

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
    wx = ospi_weather(ospi_db_i)
    eng = ospi_engine(ospi_db_i, cm, sb, wx) 

    from ospi_jp import ospi_jp
    from ospi_jo import ospi_jo
    from ospi_jc import ospi_jc
    from ospi_jn import ospi_jn
    from ospi_js import ospi_js
    from ospi_water_meter import ospi_water_meter
    from ospi_fuse import ospi_fuse

    fuse = ospi_fuse()
    wm = ospi_water_meter(ospi_db_i)
    jp = ospi_jp(ospi_db_i)
    jo = ospi_jo(ospi_db_i)
    jc = ospi_jc(ospi_db_i, eng, wm)
    jn = ospi_jn(ospi_db_i)
    js = ospi_js(ospi_db_i, sb, fuse, eng)

    ja = ospi_ja(jc, jp, jo, js, jn)


#nominal
    print(ja.handle())

