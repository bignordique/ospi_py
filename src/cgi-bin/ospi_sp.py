#!/home/leith/ospi_py/.venv/bin/python

import json
import re
import logging

class ospi_sp():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)

    def handle(self, pw, ignore_password, ospi_cmd):
        self.logger.debug(f'\n    {ospi_cmd}\n')
        cmd_match = re.match("&npw=([a-f0-9]{32})&cpw=([a-f0-9]{32})", ospi_cmd[0])
        if cmd_match is None:
            return['{"result":18}']
        else:
            if cmd_match.group(1) == cmd_match.group(2):
                if not pw == cmd_match.group(1) and not ignore_password:
                    self.ospi_db.db["pw"] = cmd_match.group(1)
                    self.logger.info(f'\n    New password set.\n')
                    self.ospi_db.wb_db(self.logger)
                return['{"result":1}']
            else: return['{"result":3}']

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

    sp = ospi_sp(ospi_db_i)

#nominal
    print(sp.handle("a6d82bced638de3def1e9bbb4983225c", False, ["&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c"]))

# npw NE cpw
    print(sp.handle("a6d82bced638de3def1e9bbb4983225c", False, ["&npw=b6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c"]))

# bogus command
    print(sp.handle("a6d82bced638de3def1e9bbb4983225c", False, ["&pw=b6d82bced638de3def1e9bbb4983225c&pw=b6d82bced638de3def1e9bbb4983225c"]))

# new password
    print(sp.handle("a6d82bced638de3def1e9bbb4983225c", False, ["&npw=b6d82bced638de3def1e9bbb4983225c&cpw=b6d82bced638de3def1e9bbb4983225c"]))

# back to default password
    print(sp.handle("b6d82bced638de3def1e9bbb4983225c", False, ["&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c"]))

# attempt to write password with disable
    print(sp.handle("b6d82bced638de3def1e9bbb4983225c", True, ["&npw=b6d82bced638de3def1e9bbb4983225c&cpw=b6d82bced638de3def1e9bbb4983225c"]))

#make sure default password still works
    print(sp.handle("a6d82bced638de3def1e9bbb4983225c", False, ["&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c"]))

