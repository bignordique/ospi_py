
# Original opensprinkler supported zones in groups of 8.
# Not sure how embedded this is, but it probably includes the javascript which
# is difficult to modify.   ESP20 has 20 zone plus master valve.  Implement the 20 zones
# plus the master valve at the end.

# Troubles with gpiozero.   Could never get the inputs to even compile?   One
# subtle issue is it doesn't seem to be thread safe.   RPi.GPIO seems to be working.
# RPi.GPIO has this clean up issue.  Think we can get away with ignoring GPIO errors.

import logging
import RPi.GPIO as GPIO

# tuple zones 1 to 20 plus "MV"
GPIO_MAP = ("18", "17", "27", "22", "23", "10", "24", "9", "25", "11", "8", "7", "0", "12", "1", "6",\
            "5", "13", "19", "16", "20")


class ospi_gpio_zones():

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        self.gpios = []
        for gpio_bit in GPIO_MAP:
            int_gpio = int(gpio_bit)
            GPIO.setup(int_gpio, GPIO.OUT)

    def update_zones(self, zone_bits):
        for ii in range(0,21):
            the_bit = zone_bits >> ii & 0x1
            the_gpio = int(GPIO_MAP[ii])
            if the_bit == 1 :
                GPIO.output(the_gpio, GPIO.HIGH)
                self.logger.debug(f'\n    zone: {ii}  gpio: {GPIO_MAP[ii]} on \n')
            else:
                GPIO.output(the_gpio, GPIO.LOW)
#                self.gpios[ii].off()
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

    from time import sleep

    gpio_zones = ospi_gpio_zones()
    data = 0x00000001
    gpio_zones.update_zones(data)
    sleep(2)
    data = 0x00000800
    gpio_zones.update_zones(data)
    sleep(2)
    GPIO.cleanup()
 

