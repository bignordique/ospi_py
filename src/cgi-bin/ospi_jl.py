#!/var/www/html/python3_11/bin/python3.11

import re
import logging
import json

class ospi_jl():

    def __init__ (self, log):
        self.log = log
        self.logger = logging.getLogger(__name__)
        self.cmd_re = re.compile(r"&(start|end|hist|type)=(\w+)")

    def handle(self, cmd):
        matches = self.cmd_re.findall(cmd[0])

        self.logger.debug(f'\n    {cmd[0]} {matches}\n')

        if matches == []:
            self.logger.warning(f'\n    command {cmd[0]} no matches\n')
            return['{"result":18}']

# requests don't match OSAPI2.2.0 doc.
# seems to be jl?pw=xxx&type=xxx&start=xxx&end=xxx
# doesn't appear app.js generates &hist=n&type=xxx   ??
        if matches[0][0] == "type" :
            response = json.dumps(self.log.get_log(int(matches[1][1]), int(matches[2][1]), \
                                           matches[0][1]))
        else:
            response = json.dumps(self.log.get_log(int(matches[0][1]), int(matches[1][1]), None))
        self.logger.debug(f'\n    response: {response}\n')
        return response

        self.logger.error(f'\n    command: "{matches[0][0]}" unrecognized.\n')
        return['{"result":18}']

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

    from ospi_log import ospi_log
    log = ospi_log(ospi_db_i)
    log.water_log_dir = "water_log_dir"

    jl = ospi_jl(log)

#nominal
    print(jl.handle(["&type=s1&start=16381&end=20000&"]))
    print(jl.handle(["&hist=181&type=rd"]))  #deprecated, but try the error path



