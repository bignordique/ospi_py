#!/var/www/html/python3_11/bin/python3.11

import json
import re
import logging

# not terribly consistent with return values

class ospi_co():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&(\w*)=([a-zA-Z0-9.,-]*)")

    def handle(self, cmd):
        matches = self.cmd_re.findall(cmd[0])

        if matches == []:
            self.logger.warning(f'\n    command {cmd[0]} no matches\n')
            return['{"result":18}']

        writeback_db = False

        for opt_set in matches:
            option = opt_set[0]
            param = opt_set[1] 
            match option:
                case "loc" | "wto" | "ifkey" | "mqtt" | "dname":  
                    self.ospi_db.db["settings"][option] = param
                    writeback_db = True
                    self.logger.info(f'\n    {option} set to {param}.\n')
                case "ttt":  
                    #set time manually.   FIXME
                    pass
                case "tz" | "ntp1" | "ntp2" | "ntp3" | "ntp4" | "hp0" | "hp1" | "ext" |\
                     "sdt" | "mas" | "mas2" | "mton" | "mton2" | "mtof" | "mtof2" | "sn1t" |\
                     "sn1o" | "sn1on" | "sn1of" | "sn2t" | "sn2o" | "sn2on" | "sn2of" |\
                     "wl" | "ipas" | "devid" | "uwt" | "lg" | "fpr0" | "fpr1" | "sar" | "ife":  
                    try:
                        param = int(opt_set[1])
                    except ValueError:
                        self.logger.error(f'\n    co "{option}" inappropriate parameter\n')
                        return['{"result":18}'] 
                    self.ospi_db.db["options"][option] = param
                    writeback_db = True
                    self.logger.info(f'\n    {option} set to {param}.\n')
                case "fwv" | "fwm" | "hwv" | "hwt" | "dexp" | "mexp":
                    self.logger.warning(f'    \nAttmept to set RO option {option}.\n')
                case "otc" | "dhcp" | "ip" | "gw" | "dns" | "subn" | "ntp" | "con" | "lit" |\
                     "dim" | "bst":
                    self.logger.warning(f'\n    Attmept to set option not in DB "{option}".\n') 
                case "den":
                    self.logger.warning(f'\n    Should use cv command "{option}".\n')
                case _:
                    self.logger.warning(f'\n    Unrecognized co "{option}".\n')

        if writeback_db : self.ospi_db.wb_db(self.logger)
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

    co = ospi_co(ospi_db_i)

#nominal
# not in DB
    print(co.handle(["blah"]))
# try a loc to string sorta
    print(co.handle(["&loc=42.1,-110.4"]))
# den is set by cv
    print(co.handle(["&den=123"]))
# dhcp not in DB
    print(co.handle(["&dhcp=1a3"]))
# number to ntp1
    print(co.handle(["&ntp1=46"]))
# nonnumber to ntp1
    print(co.handle(["&ntp1=4u8"]))
# set ipas
    print(co.handle(["&ipas=1"]))
# set tz
    print(co.handle(["&tz=13"]))
#set tz an loc
    print(co.handle(["&tz=14&loc=42.1,-110.4"]))
#set a bunch
    print(co.handle(["&tz=20&loc=40.44984,-105.00539&lg=1&mas=0&mton=0&mtof=0&mas2=0&mton2=0&mtof2=0&ext=2&sdt=0&uwt=0&wl=100&sn1o=1&fpr0=100&fpr1=0&sn1on=0&sn1of=0&sn2o=1&sn2on=0&sn2of=0&ifkey=&ife=0&dname=My+OpenSprinkler&hp0=144&hp1=31&devid=0&ipas=0&sar=0&sn1t=0&sn2t=0"]))
