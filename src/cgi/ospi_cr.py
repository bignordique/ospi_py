#!/var/www/html/python3_11/bin/python3.11

import re
import logging
import urllib.parse

"""
For reasons unknown, the GUI generates a stream of /cr requests for a single click.  The number
of requests is variable in the two to eight range.  If a program is running and the GUI
asks to cancel the program, then a single /cr is sent.   Go figure??

Significant effort was expended making sure sbits, ps, and sn are correct.

What we're gonna do is suppress /cr requests for 3 seconds after the receipt of an initial
/cr.   A kludge, you bet.  Fixing the GUI is a rather not.
"""

import time

class ospi_cr():

    def __init__ (self, ospi_db, eng):
        self.ospi_db = ospi_db
        self.eng = eng
        self.logger = logging.getLogger(__name__)
# Doc says ssta should be present, but its not there.
        self.cmd_re = re.compile(r"(\d+),?")
        self.time_log = []

    def handle(self, cmd):
        url_decoded = urllib.parse.unquote(cmd[0])
        match = self.cmd_re.findall(url_decoded)

        if match == None:
            self.logger.warning(f'\n    {url_decoded} no matches\n')
            return['{"result":18}']
        
        prog_list =[]
        for item in match :
            prog_list.append(int(item))

        time_ns = time.time()
        if len(self.time_log) == 0 : 
            self.time_log = [time_ns]
        else:
            time_diff = time_ns - self.time_log[-1]
            if time_diff < 3 :
                self.time_log.append(time_diff)
                self.time_log.append(time_ns)
            else :
                self.time_log=[time_ns]

        if len(self.time_log) == 1 :
            curr_time = self.ospi_db.get_utc_stamp(self.logger) 
            self.eng.runonce(curr_time, prog_list)
        else:
            self.logger.warning(f'\n    Multiple /cr detected and suppressed\n')

        self.logger.debug(f'\n    {url_decoded} {prog_list}\n    {self.time_log}\n')
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

    from ospi_station_bits import ospi_station_bits
    from ospi_weather import ospi_weather
    from ospi_check_match import ospi_check_match
    sb = ospi_station_bits(ospi_db_i)
    cm = ospi_check_match(ospi_db_i)
    wx = ospi_weather()

    from ospi_engine import ospi_engine
    eng = ospi_engine(ospi_db_i, cm, sb, wx)

    cr = ospi_cr(ospi_db_i, eng)

#nominal
    print(cr.handle(["&t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"]))

    print(cr.handle(["&t=[120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"]))


