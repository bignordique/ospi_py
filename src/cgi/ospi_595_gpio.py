#!/var/www/html/python3_11/bin/python3.11

import logging
import ospi_defs

# Tried to use RPi.GPIO, but got some issue with glibc??
# I think NativeFactory should work for the simple stuff here.

class ospi_595_gpio():

    def __init__ (self, win=False):
        self.win = win
        self.logger = logging.getLogger(__name__)   
        if not self.win :
            from gpiozero import OutputDevice as GPIO_OUT
            from gpiozero.pins.native import NativeFactory
            my_fact = NativeFactory()
            self.g = GPIO_OUT("GPIO17", active_high=True, initial_value=True, pin_factory=my_fact)  
                              # aka "#OE", "A1", pin11
            self.ser = GPIO_OUT("GPIO27", active_high=True, initial_value=False, pin_factory=my_fact)
                                # aka "Data", "D5", pin13
            self.sck = GPIO_OUT("GPIO4", active_high=True, initial_value=False, pin_factory=my_fact)
                                # aka "Clock", "D6", pin7
            self.rck = GPIO_OUT("GPIO22", active_high=True, initial_value=False, pin_factory=my_fact)
                                # aka "Latch", "D7", pin15

            self.update_595(0, ospi_defs.MAX_NUM_STATIONS)

            self.g.off()

# map station_bits to organization of 595s.  Will work up to 32 stations.
    def update_595(self, data, channels):
        if not self.win :
            tnf_data = data << 24 & 0xff000000  | data & 0x00ffff00 | data & 0xff000000 >> 24
            for ii in range(0, ospi_defs.MAX_NUM_STATIONS, 1):
                if tnf_data >> ii & 0b1 == 1: self.ser.on() 
                else: self.ser.off()
                self.sck.on()
                self.sck.off()
            self.rck.on()
            self.rck.off()
        else :
            out_string = ""
            for ii in range (31,0, -1):
                if data >> ii & 0b1 != 0 :
                    out_string += "1"
                else :
                    out_string += "0"
            print(out_string)

        self.logger.debug(f'\n    input data {data}\n')

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

#    ospi_db_i = ospi_db()
#    ospi_db_i.init_db(DBFILLE, "config/ospi_defaults.txt")

    import platform
    win = True if platform.system() == "Windows" else False
    gpio = ospi_595_gpio(win)

    import time
    time.sleep(1)
    
    data = 0xffffffff
    gpio.update_595(data, 24)
    time.sleep(1)
    data = 0x00000000
    gpio.update_595(data, 24)
    time.sleep(1)

    data = 0x0001
    while True:
        """
        data[4] = 1
        gpio.update_595(data)
        time.sleep(10)
        data[4] = 1
        gpio.update_595(data)
        time.sleep(10)
        """

        gpio.update_595(data, 24)
        time.sleep(0.5)
        gpio.update_595(0x0000, 24)
        time.sleep(0.5)
        data = data << 1 & 0xffffff
        if data == 0 : data = 0x0001

