#!/var/www/html/python3_11/bin/python3.11

import re
import logging

class ospi_je():

    def __init__ (self):
        self.logger = logging.getLogger(__name__)

    def handle(self, cmd):

#no cmd

        self.logger.warning(f'\n    /je not supported\n')
        return['{"result":1}']

if __name__ == "__main__":

    import os

    DBFILE = "run/ospi_db.json"
    try :
        os.remove(DBFILE)
    except OSError: any

    LOGFILE = "test/log"
    try :
        os.remove(LOGFILE)
    except OSError: any

    DEFFILE = "config/ospi_defaults.txt"

    from logging.handlers import RotatingFileHandler

    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=1)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

#    ospi_db_i = ospi_db()
#    ospi_db_i.init_db(DB_FILE, DEFFILE)

    je = ospi_je()

#nominal
    print(je.handle([]))



