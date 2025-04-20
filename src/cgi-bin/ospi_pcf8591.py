#!/var/www/html/python3_11/bin/python3.11

"""
Lacking good design info...
No load AC                           27.86 rms
Single solendoid with plunger        26.61 rms
Single solendoid witoout plunger     24.59 rms

Voltages will change with temperature.

Without plunger probably a good guess at inrush.

Multiple on zones higher current, lower voltages.

Seems like examining several measurements over time a good way
to get rid of without plunger data.

Somewhat arbitrarily.   Difference between no laod and normal load
is 1.25V.   Split difference at 0.625 volts.

No load threahold                   >27.235

Short threshold... set it less than without plunger, although gonna
doe some time algo to filter out inrush.
"Short" threshold                   <24 rms

"""

import threading
import logging
from time import sleep

rd_interval = 1/60

class ospi_pcf8591():

    def __init__ (self, ac_store_function, win=False):
        self.ac_store_function = ac_store_function
        self.logger = logging.getLogger(__name__)   
        self.address = 0x48
        self.A0 = 0x40
        r_top = 11770
        r_bottom = 966
        fudge = 1.055
        rms = 0.707
        self.v_multiplier = fudge * rms * (r_top + r_bottom)/r_bottom
        self.ac_store_function(0)
        """
        if not win :
            import smbus
            self.bus = smbus.SMBus(1)
            self.thread = threading.Thread(target=self.run, daemon=True)
            self.thread.start()
        """

    def run(self):
        while True:
            value = 0
            self.bus.write_byte(self.address, self.A0)
            value = self.bus.read_byte(self.address)
            adjusted_value = "%1.2f " %(value*(3.3/255)*self.v_multiplier)
            self.logger.debug(f'\n    AC voltage: {adjusted_value}')
            self.ac_store_function(adjusted_value)
            sleep(rd_interval)

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

#    ospi_db_i = ospi_db()
#    ospi_db_i.init_db(DBFILE, DEFFILE)

    def print_volts(volts):print(float(volts))

    import platform
    win = True if platform.system() == "Windows" else False
    pcf8591 = ospi_pcf8591(print_volts, win)
    sleep (10*rd_interval)
