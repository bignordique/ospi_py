#!/var/www/html/python3_11/bin/python3.11

import re
import logging

class ospi_cm():

    def __init__ (self, ospi_db, eng):
        self.ospi_db = ospi_db
        self.eng = eng
        self.logger = logging.getLogger(__name__)
# ssta, t not always present
# cm command places pw after command??  Whacky format
        self.cmd_re = re.compile(r"&?(\w{1,4})=(\d+)")

    def handle(self, cmd):
        match = self.cmd_re.findall(cmd[0])

        if match == None:
            self.logger.warning(f'\n    {cmd[0]} no matches\n')
            return['{"result":18}']

        sid = None
        en = None
        t = 0
        ssta = 0
        for item in match :
            if item[0] == "sid" : sid = int(item[1])
            if item[0] == "en" :  en = int(item[1])
            if item[0] == "t" :  t = int(item[1])
            if item[0] == "ssta" :  ssta = int(item[1])

        if sid == None : return['{"result":16}']

        if sid > self.ospi_db.db["status"]["nstations"] or sid < 0 :
            return['{"result":17}']

        if en == None :
            return['{"result":16}']

        if en == 1 :
            if t <= 0 or t > 68400 :
                return['{"result":17}']
            if sid + 1 == self.ospi_db.db["options"]["mas"] or \
               sid + 1 == self.ospi_db.db["options"]["mas2"] :
                return['{"result":48}']

        self.logger.debug(f'\n    {cmd[0]} {match}')

        self.eng.manual_run_station(self.ospi_db.get_utc_stamp(self.logger), sid, en, t, ssta)
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

    class fake_engine():
        def __init__(self):
            pass
        def manual_run_station(self, curr_time, sid, en, t, ssta) :
            print(curr_time, sid, en, t, ssta)

    eng = fake_engine()

    cm = ospi_cm(ospi_db_i, eng)

#nominal
    print(cm.handle([""]))
    print(cm.handle(["&sid=13"]))
    print(cm.handle(["&sid=255"]))
    print(cm.handle(["&sid=12&en=1&t=-1"]))
    ospi_db_i.db["options"]["mas2"] = 14
    print(cm.handle(["&sid=13&en=1&t=754"]))
    print(cm.handle(["&sid=12&en=1&t=754"]))
    print(cm.handle(["&sid=2&en=0&t=12&ssta=1"]))
#


