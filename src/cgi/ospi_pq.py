#!/var/www/html/python3_11/bin/python3.11

import re
import logging

class ospi_pq():

    def __init__ (self, ospi_db, eng):
        self.ospi_db = ospi_db
        self.eng = eng
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"dur=(\d*)")

    def handle(self, cmd):
        match = self.cmd_re.search(cmd[0])

        if match == None :
            dur = 0
        else:
            dur = int(match.group(1))
 
        curr_time = self.ospi_db.get_utc_stamp(self.logger) 
        self.eng.toggle_pause(curr_time, dur)
        self.logger.debug(f'\n    {cmd[0]} {dur}\n')

        return['{"result":1}']

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

    from ospi_station_bits import ospi_station_bits
    from ospi_weather import ospi_weather
    from ospi_check_match import ospi_check_match
    sb = ospi_station_bits(ospi_db_i)
    cm = ospi_check_match(ospi_db_i)
    wx = ospi_weather()

    from ospi_engine import ospi_engine
    eng = ospi_engine(ospi_db_i, cm, sb, wx)

    pq = ospi_pq(ospi_db_i, eng)

#nominal
    print(pq.handle(["dur=600"]))



