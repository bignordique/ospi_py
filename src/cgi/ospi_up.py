#!/var/www/html/python3_11/bin/python3.11

import re
import logging

class ospi_up():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&pid=(\d*)")

    def handle(self, cmd):
        match = self.cmd_re.search(cmd[0])

        if match == None:
            self.logger.warning(f'\n    {cmd[0]} no matches\n')
            return['{"result":18}']

        pid = int(match.group(1))
        nprogs = self.ospi_db.db["programs"]["nprogs"]

        if pid > 0 and pid < nprogs:
            program_data = self.ospi_db.db["programs"]["pd"]
            displaced_index = pid - 1
            displaced_entry = program_data[displaced_index]
            program_data[displaced_index] = program_data[pid]
            program_data[pid] = displaced_entry
        else:
            self.logger.error(f'\n    pid: {pid} nprogs: {nprogs}')
            return['{"result":17}']

        self.ospi_db.wb_db(self.logger)

        self.logger.debug(f'\n    pid: {pid}\n')
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

    up = ospi_up(ospi_db_i)

#nominal
    print(up.handle(["&pid=3"]))
    print(up.handle(["&pid=0"]))
    print(up.handle(["&pid=2"]))



