
import logging
import RPi.GPIO as GPIO
FUSE_GPIO = 21

class ospi_fuse():

    def __init__ (self, fuse_store_function):
        self.logger = logging.getLogger(__name__)
        self.fuse_store_function = fuse_store_function
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(FUSE_GPIO, GPIO.IN)
        self.check_fuse()

    def check_fuse(self):
        if GPIO.input(FUSE_GPIO):
            self.set_blown()
        else:
            self.set_intact()

    def set_intact(self):
        self.fuse_store_function("intact")
        self.logger.debug(f'\n    set fuse intact\n')

    def set_blown(self):
        self.fuse_store_function("blown")
        self.logger.debug(f'\n    set fuse blown\n')   

if __name__ == "__main__" :

    import os
    LOGFILE = "test/log"
    try :
        os.remove(LOGFILE)
    except: OSError:any
  
    from logging.handlers import RotatingFileHandler
    rot_handler = RotatingFileHandler(LOGFILE, maxBytes=30000, backupCount=1)
    logging.basicConfig(format="%(asctime)s %(name)s %(module)s:%(lineno)d "+\
                               "%(levelname)s:%(message)s",
                        handlers = [rot_handler],
                        level=logging.DEBUG) 
    logging.getLogger(__name__)
    logging.info("\n    Startup\n")

    def report_fuse(status):
        logging.debug(f'\n    {status}\n')
    

    fuse_inst = ospi_fuse(report_fuse)

    from time import sleep
    try:
        while True:
            fuse_inst.check_fuse()
            sleep(1)
    except KeyboardInterrupt:
        logging.info("\n    KeyboardInterrupt caught\n")