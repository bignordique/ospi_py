
import logging
import RPi.GPIO as GPIO
FUSE_GPIO = 21

class ospi_fuse():

    def __init__ (self):
        self.logger = logging.getLogger(__name__)
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(FUSE_GPIO, GPIO.IN)

    def get_fuse(self):
        if GPIO.input(FUSE_GPIO):
            self.logger.debug(f'\n    report fuse blown\n')
            return("blown")
        else:
            self.logger.debug(f'\n    report fuse intact\n')
            return("intact") 

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
    

    fuse_inst = ospi_fuse()

    from time import sleep
    try:
        while True:
            print(fuse_inst.get_fuse())
            sleep(1)
    except KeyboardInterrupt:
        logging.info("\n    KeyboardInterrupt caught\n")