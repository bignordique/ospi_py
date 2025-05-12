#!/var/www/html/python3_11/bin/python3.11

import re
import logging

class ospi_dl():

    def __init__ (self, log):
        self.log = log
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&day=(all|\d+)")

    def handle(self, cmd):
        match = self.cmd_re.search(cmd[0])

        if match == None:
            self.logger.warning(f'\n    {cmd[0]} no matches\n')
            return['{"result":18}']

        self.log.delete_log(match.group(1))
        self.logger.debug(f'\n    {cmd[0]} {match.group(1)}\n')
        return['{"result":1}']

if __name__ == "__main__":

    import os
    import ospi_db

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

    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    from ospi_log import ospi_log
    log = ospi_log(ospi_db_i)
    
    dl = ospi_dl(log)

#nominal
    print(dl.handle(["&day=16381"]))
    print(dl.handle(["&day=all"]))



