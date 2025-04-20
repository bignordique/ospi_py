#!/var/www/html/python3_11/bin/python3.11

import logging

# Original opensprinkler supported zones in groups of 8.
# Not sure how embedded this is, but it probably includes the javascript which
# is difficult to modify.   ESP20 has 20 zone plus master valve.  Implement the 20 zones
# plus the master valve at the end.

# Troubles with RPi.GPIO in the past.   Stick with this.
from gpiozero import OutputDevice as GPIO_OUT
from gpiozero.pins.native import NativeFactory
my_fact = NativeFactory()

# tuple zones 1 to 20 plus "MV"
GPIO_MAP = ("18", "17", "27", "22", "23", "10", "24", "9", "25", "11", "8", "7", "0", "12", "1", "6",\
            "5", "13", "19", "16", "20")


class ospi_gpio_zones():

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.gpios = []
        for gpio_bit in GPIO_MAP:
           self.gpios.append(GPIO_OUT("GPIO"+gpio_bit, active_high=True, initial_value=False, pin_factory=my_fact))

    def update_zones(self, zone_bits):
        for ii in range(0,21):
            the_bit = zone_bits >> ii & 0x1
            if the_bit == 1 :
                self.gpios[ii].on()
                self.logger.debug(f'\n    zone: {ii}  gpio: {GPIO_MAP[ii]} on \n')
            else:
                self.gpios[ii].off()
                self.logger.debug(f'\n    zone: {ii}  gpio: {GPIO_MAP[ii]} off \n')


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

    from logging.handlers import RotatingFileHandler
    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, maxBytes=30000, 
                                                      backupCount=5)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    gpio_zones = ospi_gpio_zones()
    data = 0x00000001
    gpio_zones.update_zones(data)
    data = 0x00100000
    gpio_zones.update_zones(data)
