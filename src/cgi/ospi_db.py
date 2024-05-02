#!/var/www/html/python3_11/bin/python3.11

import os
import json
import logging
import time
import shutil

class ospi_db:
    db = {}
    db_file = ""

    def __init__ (self):
        self.logger = logging.getLogger(__name__)
        self.logger.debug("\n    in ospi_db __init__\n")

    def init_db(self, db_file, defaults_file):
        ospi_db.db_file = db_file
        db_path_exists = os.path.exists(ospi_db.db_file)
        db_path_isfile = os.path.isfile(ospi_db.db_file)
        if db_path_exists: 
            if db_path_isfile:
                if not os.access(ospi_db.db_file, os.W_OK):
                    self.logger.error(f'\n    Path {ospi_db.db_file} exists, '\
                                      +'is a file, not writeable.  Exiting.\n')
                    exit()
            else:
                self.logger.error(f'\n    Path {ospi_db.db_file} exists, '\
                                  +'but not a file. Exiting.\n')
                exit()
            shutil.copyfile(ospi_db.db_file, ospi_db.db_file+".1")
        else: self.default_db(defaults_file)
        with open (db_file, "r") as f:
             ospi_db.db = json.load(f) 
        self.debug_clk = ospi_db.db["debug"]["start"]

    def default_db(self, defaults_file):
        self.logger.info(f'\n    Setting database to defaults.\n')
        with open (defaults_file, "r", encoding='utf-8-sig') as f:
            as_string = f.read()
            as_json = json.loads(as_string)
        with open (ospi_db.db_file, "w") as f:
            json.dump(as_json, f)

    def wb_db(self, logger):
        logger.info(f'\n    DB writeback.\n')
        with open (ospi_db.db_file, "w") as f:
            json.dump(ospi_db.db, f)

    def get_lcl_stamp(self, logger):
        if ospi_db.db["debug"]["accel"] == 0 :
            tm = time.localtime()
            return int(time.time()) + tm.tm_gmtoff
        else :
            return self.debug_clk - 7 * 60 * 60

    def get_utc_stamp(self, logger):
        if ospi_db.db["debug"]["accel"] == 0 :
            return int(time.time())
        else :
            self.debug_clk += ospi_db.db["debug"]["accel"]
            return self.debug_clk

if __name__ == "__main__":

    DB_DEFAULTS_FILE = "config/ospi_defaults.txt"
    DBFILE = "run/ospi_db.json"

    from logging.handlers import RotatingFileHandler

    LOGFILE = "test/log"
    try :
        os.remove(LOGFILE)
    except OSError: any

    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=1)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DB_DEFAULTS_FILE)

    print ("program 0: ", ospi_db_i.db["programs"]["pd"][0])
    print ("UTC timestamp:", ospi_db_i.get_utc_stamp(logger))
    print ("local adjusted timestamp:", ospi_db_i.get_lcl_stamp(logger))
