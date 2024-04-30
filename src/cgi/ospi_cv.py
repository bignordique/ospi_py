#!/var/www/html/python3_11/bin/python3.11

import json
import re
import logging

# not terribly consistent with return values

class ospi_cv():

    def __init__ (self, ospi_db, eng):
        self.ospi_db = ospi_db
        self.eng = eng
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&(\w*)=(\w*)")

    def handle(self, cmd):
        matches = self.cmd_re.findall(cmd[0])

        if matches == []:
            self.logger.warning(f'\n    command {cmd[0]} no matches\n')
            return['{"result":18}']

        writeback_db = False

        for opt_set in matches:
            var = opt_set[0]
            param = opt_set[1]
            match var:
                case "rsn": 
                    self.eng.reset_all_stations()
                case "rbt":  # reboot, probably a NOP
                    pass
                case "en":
                    try:
                        param_as_int = int(param)
                    except ValueError:
                        self.logger.error(f'\n    cv "{var}" inappropriate parameter\n')
                        return['{"result":18}']
                    if param_as_int == 0 or param_as_int == 1:
                        self.ospi_db.db["settings"]["en"] = param_as_int
                        writeback_db = True
                        self.logger.info(f'\n    {var} set to {param}.\n')
                    else:
                        self.logger.error(f'\n    "{var}" out of range paramater\n')
                        return['{"result":18}']
                case "rd":
# Rain delay implementation convoluted? 
                    try:
                        param_as_int = int(param)
                    except ValueError:
                        self.logger.error(f'\n    "{var}" inappropriate parameter\n')
                        return['{"result":18}']

                    if param_as_int < 0 or param_as_int > 32767:
                        self.logger.error(f'\n    "{var}" out of range parameter\n')
                        return['{"result":18}']
                    elif param_as_int == 0 :
                        self.eng.raindelay_stop()
                    else :
                        self.ospi_db.db["settings"]["rdst"] = \
                                self.ospi_db.get_utc_stamp(self.logger) + param_as_int * 60# * 60
                        writeback_db = True
                        self.logger.info(f'\n     rdst set to: {self.ospi_db.db["settings"]["rdst"]}\n')
                case "re":
                    pass
                case "update":
                    pass
                case "ap":
                    pass
                case _:
                    self.logger.warning(f'\n    Unrecognized cv: {var}\n')

        if writeback_db: self.ospi_db.wb_db(self.logger)
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
    
    from ospi_engine import ospi_engine
    eng = ospi_engine(ospi_db_i)
    
    cv = ospi_cv(ospi_db_i, eng)


#nominal
# improper
    print(cv.handle(["xyzzy"]))
# nominal
    print(cv.handle(["&en=0"]))
# string instead of integer
    print(cv.handle(["&rd=1y3"]))
# out of range
    print(cv.handle(["&rd=32768"]))

