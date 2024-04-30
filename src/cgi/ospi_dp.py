#!/var/www/html/python3_11/bin/python3.11

import re
import logging

class ospi_dp():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&pid=(-?\d*)")

    def handle(self, cmd):
        match = self.cmd_re.search(cmd[0])

        if match == []:
            self.logger.warning(f'\n    {cmd[0]} no matches\n')
            return['{"result":18}']

        pid = int(match.group(1))
        program_data = self.ospi_db.db["programs"]["pd"]
     
        ii = 0
        nprogs = 0
        new_program_data = list()
        for jj in program_data:
            if not(pid == ii or pid == -1):
                nprogs += 1
                new_program_data.append(jj)
            else:
                self.logger.debug(f'\n    Delete program #{ii} {jj}\n')
            ii += 1
        self.ospi_db.db["programs"]["pd"] = new_program_data
        self.ospi_db.db["programs"]["nprogs"] = nprogs
        self.ospi_db.wb_db(self.logger)

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
                                                      backupCount=5)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    dp = ospi_dp(ospi_db_i)

#nominal
    print(dp.handle(["&pid=-1"]))
    print(ospi_db.db["programs"])
    os.remove(DBFILE)
    try :
        os.remove(DBFILE+".1")
    except: OSError:any
    ospi_db_i.init_db(DBFILE, DEFFILE)
    print(dp.handle(["&pid=1"]))
    print(ospi_db.db["programs"])



