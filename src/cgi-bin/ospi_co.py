#!/home/leith/ospi_py/.venv/bin/python

import json
import re
import logging
from urllib.parse import unquote 

# not terribly consistent with return values

class ospi_co():

    def __init__ (self, ospi_db, sb, wx):
        self.ospi_db = ospi_db
        self.sb = sb
        self.wx = wx
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&(\w*)=([a-zA-Z0-9.,%:-_]*)")
#        self.find_quotes = re.compile(r"%22")

    def handle(self, cmd):
        matches = self.cmd_re.findall(cmd[0])

        if matches == []:
            self.logger.warning(f'\n    command {cmd[0]} no matches\n')
            return['{"result":18}']

        writeback_db = False
        update_wl = False

        for opt_set in matches:
            option = opt_set[0]
            param = opt_set[1] 
            match option:
                case "wto":
        #Frankly don't understand this.   Seems to make the OS javascript happy.
 #                   fixed_param = re.sub(self.find_quotes, '"', param)
                    fixed_param = unquote(param)
                    fixed_param = '{' + fixed_param + '}'
                    param_json = json.loads(fixed_param)
                    for key in param_json:
                        self.ospi_db.db["settings"][option][key] = param_json[key]
                    writeback_db = True
                    update_wl = True
                case "loc":
                    un_url_encoded_param = unquote(param)
                    self.ospi_db.db["settings"][option] = un_url_encoded_param
                    self.ospi_db.db["settings"][option] = "40.44984,-105.00539"  # FIXME  Requires rework of google map stuff.
                                                                                 # set to FNL coordinates.
                    writeback_db = True
                case "ifkey" | "mqtt" | "dname":  
                    self.ospi_db.db["settings"][option] = param
                    writeback_db = True
                case "ttt":  
                    #set time manually.   FIXME
                    pass
                case "tz" | "ntp1" | "ntp2" | "ntp3" | "ntp4" | "hp0" | "hp1" | "ext" |\
                     "sdt" | "mas" | "mas2" | "mton" | "mton2" | "mtof" | "mtof2" | "sn1t" |\
                     "sn1o" | "sn1on" | "sn1of" | "sn2t" | "sn2o" | "sn2on" | "sn2of" |\
                     "wl" | "ipas" | "devid" | "uwt" | "lg" | "fpr0" | "fpr1" | "sar" | "ife" | "vm":  
                    try:
                        param = int(opt_set[1])
                        if option == "vm" and param != self.ospi_db.db["options"]["vm"] :
                            self.sb.apply_all_station_bits()
                    except ValueError:
                        self.logger.error(f'\n    co "{option}" inappropriate parameter\n')
                        return['{"result":18}'] 
                    self.ospi_db.db["options"][option] = param
                    if option == "uwt" : update_wl = True
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
        if update_wl : self.wx.compute_adjustment()
        return['{"result":1}']

if __name__ == "__main__":

    import os

    LOGFILE = "../../test/log"
    try :
        os.remove(LOGFILE)
    except: OSError:any
  
    DBFILE = "../../test/db_file"
    try :
        os.remove(DBFILE)
    except: OSError:any

    DEFFILE = "../../config/ospi_defaults.txt"

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

    from ospi_station_bits import ospi_station_bits as station_bits
    sb=station_bits(ospi_db_i)

    co = ospi_co(ospi_db_i, sb)

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
    print(co.handle(["&tz=20&loc=40.44984,-105.00539&lg=1&mas=0&mton=0&mtof=0&mas2=0&mton2=0&mtof2=0&ext=2&sdt=0&uwt=0&wl=100&sn1o=1&fpr0=100&f"]))
#try a virtual mode set
    print(co.handle(["&vm=1"]))