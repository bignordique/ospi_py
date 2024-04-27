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

    LOGFILE = "test/log"
    DBFILE = "test/db_file"

    try :
        os.remove(DBFILE)
        os.remove(LOGFILE)
    except: OSError:any

    from logging.handlers import RotatingFileHandler

    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=3)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

#    ospi_db_i = ospi_db()
#    ospi_db_i.init_db("db_file", "config/ospi_defaults.txt")

    je = ospi_je()

#nominal
    print(je.handle([]))



