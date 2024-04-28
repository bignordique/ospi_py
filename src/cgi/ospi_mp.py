#!/var/www/html/python3_11/bin/python3.11

import re
import logging

# app.js doesn't seem to have a way to create an "mp" request???

class ospi_mp():

    def __init__ (self, ospi_db, eng):
        self.ospi_db = ospi_db
        self.eng = eng
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&pid=(\d*)&uwt=([0-1])")

    def handle(self, cmd):
        match = self.cmd_re.search(cmd[0])

        if match == None:
            self.logger.warning(f'\n    {cmd[0]} no matches\n')
            return['{"result":18}']
   
        curr_time = self.ospi_db.get_lcl_stamp(self.logger)
        uwt = True if match.group(2) == 1 else False
        pid = int(match.group(2)) + 1
#        self.eng.manual_start_program(pid, uwt, curr_time)

        self.logger.debug(f'\n    {cmd[0]} pid:{match.group(1)} uwt:{match.group(2)}')
        return['{"result":1}']

if __name__ == "__main__":
    import os

    LOGFILE = "test/log"
    DBFILE = "test/db_file"

    try :
        os.remove(DBFILE)
        os.remove(LOGFILE)
    except: OSError:any

    from logging.handlers import RotatingFileHandler

    LOGFILE = "log"

    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=5)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db("db_file", "/var/www/html/ospi_data/ospi_defaults.txt")

    from ospi_station_bits import ospi_station_bits
    from ospi_weather import ospi_weather
    from ospi_check_match import ospi_check_match
    sb = ospi_station_bits(ospi_db_i)
    cm = ospi_check_match(ospi_db_i)
    wx = ospi_weather(ospi_db_i)

    from ospi_engine import ospi_engine
    eng = ospi_engine(ospi_db_i, cm, sb, wx)

    mp = ospi_mp(ospi_db_i, eng)
#nominal
    print(mp.handle(["&pid=11&uwt=0"]))
#uwt not binary
    print(mp.handle(["&pid=11&uwt=3"]))


