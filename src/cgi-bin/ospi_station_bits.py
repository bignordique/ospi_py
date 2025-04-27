#!/var/www/html/python3_11/bin/python3.11

import logging
import ospi_defs
from ospi_gpio_zones import ospi_gpio_zones

import platform
win = True if platform.system() == "Windows" else False
gpio = ospi_gpio_zones()

class ospi_station_bits():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.station_bits = 0

    def set_station_bit(self, sid, value):
        if sid > ospi_defs.MAX_NUM_STATIONS :
            self.logger.error (f'\n    set station bit {sid} exceeds MAX_NUM_STATIONS {ospi_defs.MAX_NUM_STATIONS}\n')
            return False
        self.logger.debug(f'\n    set_station_bit: {sid} to: {value}\n')
        if value == 1:
            self.station_bits = self.station_bits | 0b1 << sid
        else:
            self.station_bits = self.station_bits & (0xffffffff - (0x1 << sid))

    def apply_all_station_bits (self):
        self.logger.debug(f'\n    apply_all_station_bits: {self.station_bits}\n')
        gpio.update_zones(self.station_bits)
        

    def clear_all_station_bits (self):
        self.logger.debug(f'\n    clear_all_station_bits\n')
        self.station_bits = 0

    def get_station_bit (self, sid):
        return True if self.station_bits >> sid & 0b1 == 0b1 else False

    def sn(self):
        sn = []
        for ii in range (0, self.ospi_db.db["status"]["nstations"]) :
            sn.append(self.station_bits >> ii & 0b1)
        return sn


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
                        handlers=[RotatingFileHandler(LOGFILE, 
                                                      maxBytes=30000, 
                                                      backupCount=1)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)


    sb = ospi_station_bits(ospi_db_i)

    from time import sleep

    sid = 0
    while True:
#        sb.turn_on_station(sid)
        sb.set_station_bit(sid, 1)
        sid = (sid + 1) % 24
        sb.apply_all_station_bits()
        sleep(0.25)
        sb.clear_all_station_bits()
        sb.apply_all_station_bits()
        sleep(0.25)

