#!/var/www/html/python3_11/bin/python3.11

import threading
import logging
from cron_entry import cron_entry
from ospi_tasks_midnight import ospi_tasks_midnight
import time


class ospi_server_thread():

    def __init__ (self, ospi_db, eng, prune_log, compute_daily_adjustment, log_nozone):
        self.ospi_db = ospi_db
        self.eng = eng
        self.logger = logging.getLogger(__name__)
        self.thread = threading.Thread(target=self.thread_func, daemon=True)
        self.lock = threading.Lock()
        self.at_midnight = ospi_tasks_midnight(ospi_db, prune_log, compute_daily_adjustment, log_nozone)
        self.thread.start()


    def thread_func (self):
 # need to wait for ospi_db to load before calling engine, should get rid of this 
        time.sleep(1)
        while True:
            self.lock.acquire(blocking=True, timeout=1.0)
            self.at_midnight.check_entry()
            self.eng.do_loop(self.ospi_db.get_utc_stamp(self.logger))

    def unlock_opsi_thread(self):
        self.lock.release()


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
    logger.info("Startup")

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    class eng(): 
        def do_loop(self): pass
    eng_i = eng()

    def prune_log(): pass
    def compute_daily_adjustment(): pass

    test = ospi_server_thread(ospi_db_i, eng, prune_log, compute_daily_adjustment)

    from time import sleep
    try:
        while True:
            sleep(1)
    except KeyboardInterrupt:
        logging.info("\n    KeyboardInterrupt caught\n")

