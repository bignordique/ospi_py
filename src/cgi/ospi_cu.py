#!/var/www/html/python3_11/bin/python3.11

import re
import logging
import urllib.parse

class ospi_cu():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&jsp=(.*)")

    def handle(self, cmd):
        url_decoded = urllib.parse.unquote(cmd[0])
        match = self.cmd_re.search(url_decoded)

        if match == []:
            self.logger.warning(f'\n    {url_decoded} no matches\n')
            return['{"result":18}']

        self.ospi_db.db["settings"]["jsp"] = match.group(1)
        self.ospi_db.wb_db(self.logger)

        self.logger.debug(f'\n    {url_decoded} {match}\n')
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

    cu = ospi_cu(ospi_db_i)

#nominal
    print(cu.handle(["&jsp=http%3A%2F%2Ftethys.bignordique.com"]))



