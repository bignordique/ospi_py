#!/var/www/html/python3_11/bin/python3.11

import json
import re
import logging

class ospi_cx():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&local")

    def handle(self, cmd, request_body):
        matches = self.cmd_re.search(cmd[0])

        if matches == None:
            self.logger.warning(f'\n    command {cmd[0]} no matches\n')
            return['{"result":18}']

        self.logger.debug(f'\n    request_body {request_body}')
        self.ospi_db.db["local"] = json.loads(request_body)

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
                                                      backupCount=1)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    cx = ospi_cx(ospi_db_i)

#nominal
# improper
    print(cx.handle(["xyzzy"], ""))
# nominal
    print(cx.handle(["&local"], '{"abc":456}'))

