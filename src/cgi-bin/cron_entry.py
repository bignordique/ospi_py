#!/var/www/html/python3_11/bin/python3.11
import logging
import datetime
from dateutil import tz
from crontab import CronTab

"""  One shots cron jobs """

class cron_entry():

    def __init__(self, id, tab, func):
        self.id = id
        self.entry = CronTab(tab)
        self.func = func
        self.local_zone = tz.tzlocal()
        self.triggered = False
        self.next = self.entry.next(datetime.datetime.now(tz=self.local_zone))
        self.logger = logging.getLogger(__name__)

    def check_entry(self):
        previous = self.next
        self.next= self.entry.next(datetime.datetime.now(tz=self.local_zone))
#        self.logger.debug(f'\n    {self.id}: previous: {previous}  next: {self.next} ' +
#                          f'triggered: {self.triggered}\n')
# Depending on the underlying clock, double trigger possible.
        if self.next > previous and not self.triggered:
            self.func()
            self.triggered = True
        else:
            self.triggered = False


if __name__ == "__main__":

    def print_time():
        print(datetime.datetime.now())

    import os

    LOGFILE = "test/log"
    try :
        os.remove(LOGFILE)
    except: OSError:any

    DBFILE = "test/db_file"
    try :
        os.remove(DBFILE)
    except: OSError:any

    from logging.handlers import RotatingFileHandler

    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=1)],
                        level=logging.DEBUG)


    a = cron_entry("cron_entry_test", "*/1 * * * *", print_time)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")
    import time

    for ii in range(0,10):
        a.check_entry()
        time.sleep(2)
    
