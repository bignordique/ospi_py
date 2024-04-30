#!/var/www/html/python3_11/bin/python3.11

import json
import re
import logging

class ospi_cs():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&(s|p|i|j|k|d|g|m|n)(\d{1,2})=(\w*)")

    def handle(self, cmd):
        matches = self.cmd_re.findall(cmd[0])

        if matches == []:
            self.logger.warning(f'\n    {cmd[0]} no matches\n')
            return['{"result":18}']

        writeback_db = False

        for cs_set in matches:
            field = cs_set[0]
            unit = cs_set[1]
            value = cs_set[2]
            match field:
                case "s":
                    self.ospi_db.db["stations"]["snames"][int(unit)] = value
                    writeback_db = True
                case "p":
                    self.ospi_db.db["stations"]["stn_spe"][int(unit)] = int(value)
                    writeback_db = True
                case "i":
                    self.ospi_db.db["stations"]["ignore_rain"][int(unit)] = int(value)
                    writeback_db = True
                case "j":
                    self.ospi_db.db["stations"]["ignore_sn1"][int(unit)] = int(value)
                    writeback_db = True
                case "k":
                    self.ospi_db.db["stations"]["ignore_sn2"][int(unit)] = int(value)
                    writeback_db = True
                case "m":
                    self.ospi_db.db["stations"]["masop"][int(unit)] = int(value)
                    writeback_db = True
                case "n":
                    self.ospi_db.db["stations"]["masop2"][int(unit)] = int(value)
                    writeback_db = True
                case "d":
                    self.ospi_db.db["stations"]["stn_dis"][int(unit)] = int(value)
                    writeback_db = True
                case "g":
                    self.ospi_db.db["stations"]["stn_grp"][int(unit)] = int(value)
                    self.ospi_db.db["settings"]["ps"][int(unit)][3] = int(value)
                    writeback_db = True

        if writeback_db : self.ospi_db.wb_db(self.logger)

        self.logger.debug(f'\n    {cmd[0]}')
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

    cs = ospi_cs(ospi_db_i)

#nominal
    print(cs.handle(["&s11=S12ddd&p0=0&p1=0&p2=1&i0=0&i1=0&i2=0&j0=0&j1=1&j2=0&k0=1&k1=0&k2=0&d0=0&d1=0&d2=0&g11=23"]))


