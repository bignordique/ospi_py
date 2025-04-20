#!/var/www/html/python3_11/bin/python3.11

import threading
import logging
from time import sleep
import fcntl
import io

rd_interval = 1/60
I2C_SLAVE_COMMAND=0x0703
i2c_address = 0x4d

class ospi_mcp3221():

    def __init__ (self, ac_store_function):
        self.ac_store_function = ac_store_function
        self.logger = logging.getLogger(__name__) 
        self.thread = threading.Thread(target=self.run, daemon=True)
        self.thread.start()

    def run(self):
        while True:
            try :
                with io.open("/dev/i2c-1", "rb", buffering=0) as f:
                    fcntl.ioctl(f, I2C_SLAVE_COMMAND, i2c_address)
                    values = list(f.read(2))
                    value = values[0] * 256 + values[1]
                    self.ac_store_function(value)
            except IOError as e:
                self.logger.error(f'Failed open/read to /dev/i2c-1 {e}\n')
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
    def print_value(value):
        print(value)

    mcp3221 = ospi_mcp3221(print_value)
    sleep(3*rd_interval)