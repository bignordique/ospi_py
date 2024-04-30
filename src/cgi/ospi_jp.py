#!/var/www/html/python3_11/bin/python3.11

import json
import logging
import ospi_defs
import copy

class ospi_jp():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)

    def handle(self):
        self.logger.debug(f'\n')
# Shift interval back to absolute for display on GUI.
        programs = copy.copy(self.ospi_db.db["programs"])
        nprogs = programs["nprogs"]
        for ii in range (0, nprogs) :
            program = programs["pd"][ii]
            flag = program[0]
            if flag >> 4 & 0b11 ==3 :
                rem = program[1]
                inv = program[2]
                if inv == 0 :
                    self.logger.warning (f'\n    interval equals zero\n')
                else:
                    today = int(self.ospi_db.get_lcl_stamp(self.logger)/ospi_defs.SECS_PER_DAY) 
                    programs["pd"][ii][1] = (today + rem) % inv
        return [json.dumps(programs)]

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

    jp = ospi_jp(ospi_db_i)

#nominal
    print(jp.handle())

