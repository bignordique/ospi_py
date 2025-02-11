#!/var/www/html/python3_11/bin/python3.11

import re
import logging
import urllib.parse
import json
import ospi_defs

class ospi_cp():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&(\w{1,4})=(-?[-?\w,\[\]]*)")

    def handle(self, cmd):
        url_decoded = urllib.parse.unquote(cmd[0])
        match = self.cmd_re.findall(url_decoded)

        if match == []:
            self.logger.warning(f'\n    {url_decoded} no matches\n')
            return['{"result":18}']

        for item in match:
            if item[0] == "pid": pid = int(item[1])
            if item[0] == "v": v = item[1]
            if item[0] == "name": name = item[1]
            if item[0] == "endr": endr = int(item[1])
            if item[0] == "from": frm = int(item[1])
            if item[0] == "to": to = int(item[1])
        
        program = json.loads(v)
        flag = program[0]
# Handle interval days.   Need to align intervals to local midnight.
        if flag >> 4 & 0b11 == 3 :
            rem = program[1]    # days0, aka remainder
            inv = program[2]    # days1, aka interval
            if inv == 0 :
                self.logger.warning(f'\n    interval == 0\n')
            else:
                today = int(self.ospi_db.get_lcl_stamp(self.logger) / ospi_defs.SECS_PER_DAY) 
                program[1] = (rem + inv - today % inv) % inv
                self.logger.info(f'\n   today: {today} rem: {today%inv} rem:{rem} inv:{inv} days0:{program[1]}\n')
        program.append(name)
        program.append([endr,frm,to])

        if pid == -1:
            self.ospi_db.db["programs"]["pd"].append(program)
            self.ospi_db.db["programs"]["nprogs"] += 1
            nprogs = self.ospi_db.db["programs"]["nprogs"]
            self.logger.debug(f'\n    new program #{nprogs} program: {program}\n')
        else:
            # should we first check for pid existence?
            self.ospi_db.db["programs"]["pd"][pid] = program
            self.logger.debug(f'\n    change program pid {pid} program: {program}\n')

        self.ospi_db.wb_db(self.logger)

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

    cp = ospi_cp(ospi_db_i)

#change a program
    print(cp.handle(["&pid=1&v=[0,0,0,[0,0,0,0]," +\
                    "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]]" +\
                    "&name=bar&endr=1&from=0&to=0"]))

#add a program
    print(cp.handle(["&pid=-1&v=[1,2,3,[7,6,5,4]," +\
                    "[20,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]]" +\
                    "&name=foo&endr=1&from=0&to=0"]))

# add a interval program
    print(cp.handle(["&pid=-1&v=[48,4,5,[7,6,5,4]," +\
                    "[20,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]]" +\
                    "&name=foo&endr=1&from=0&to=0"]))

# add a interval program with interval == 0
    print(cp.handle(["&pid=-1&v=[48,2,0,[7,6,5,4]," +\
                    "[20,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]]" +\
                    "&name=foo&endr=1&from=0&to=0"]))

#add program with negative start times
    print(cp.handle(["&pid=-1&v=[1,2,3,[700,-1,-1,-1]," +\
                    "[20,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]]" +\
                    "&name=foo&endr=1&from=0&to=0"]))
