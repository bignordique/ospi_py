#!/var/www/html/python3_11/bin/python3.11

DB_DEFAULTS_FILE = "/var/www/html/ospi_data/ospi_defaults.txt"
DB_FILE = "/var/www/html/ospi_data/ospi_db.json"

from datetime import datetime
import re
import logging

from ospi_sp import ospi_sp
from ospi_db import ospi_db
from ospi_ja import ospi_ja
from ospi_jp import ospi_jp
from ospi_jo import ospi_jo
from ospi_jc import ospi_jc
from ospi_jn import ospi_jn
from ospi_js import ospi_js
from ospi_cv import ospi_cv
from ospi_co import ospi_co
from ospi_cs import ospi_cs
from ospi_mp import ospi_mp
from ospi_cm import ospi_cm
from ospi_cr import ospi_cr
from ospi_cp import ospi_cp
from ospi_dp import ospi_dp
from ospi_up import ospi_up
from ospi_je import ospi_je
from ospi_dl import ospi_dl
from ospi_jl import ospi_jl
from ospi_cu import ospi_cu
from ospi_pq import ospi_pq
from ospi_jx import ospi_jx
from ospi_cx import ospi_cx
from ospi_w1_rd_temps import ospi_w1_rd_temps
from ospi_pcf8591 import ospi_pcf8591
from ospi_station_bits import ospi_station_bits
from ospi_weather import ospi_weather
from ospi_check_match import ospi_check_match
from ospi_engine import ospi_engine
from ospi_server_thread import ospi_server_thread
from ospi_db import ospi_db
from ospi_log import ospi_log

ospi_db_i = ospi_db()

ol = ospi_log(ospi_db_i)
sb = ospi_station_bits(ospi_db_i)
cm = ospi_check_match(ospi_db_i)
wx = ospi_weather(ospi_db_i)
eng = ospi_engine(ospi_db_i, cm, sb, ol)
sp = ospi_sp(ospi_db_i)
jp = ospi_jp(ospi_db_i)
jo = ospi_jo(ospi_db_i)
jc = ospi_jc(ospi_db_i, eng)
jn = ospi_jn(ospi_db_i)
js = ospi_js(ospi_db_i, sb)
ja = ospi_ja(jc, jp, jo, js, jn)
cv = ospi_cv(ospi_db_i, eng)
co = ospi_co(ospi_db_i)
cs = ospi_cs(ospi_db_i)
mp = ospi_mp(ospi_db_i, eng)
cm = ospi_cm(ospi_db_i, eng)
cr = ospi_cr(ospi_db_i, eng)
cp = ospi_cp(ospi_db_i)
dp = ospi_dp(ospi_db_i)
up = ospi_up(ospi_db_i)
je = ospi_je()
dl = ospi_dl(ol)
jl = ospi_jl(ol)
cu = ospi_cu(ospi_db_i)
pq = ospi_pq(ospi_db_i, eng)
jx = ospi_jx(ospi_db_i)
cx = ospi_cx(ospi_db_i)
temp = ospi_w1_rd_temps("", js.settemp)
acvolts = ospi_pcf8591(js.setac)
st = ospi_server_thread(ospi_db_i, eng, ol.prune_log, wx.compute_daily_adjustment)

class ospi_fcgi_top ():

    def __init__ (self):
        ospi_db_i.init_db(DBFILE, DEFFILE)
        ol.logging_ready()   #generate warning message if log file not available
        wx.initialize()
        self.ospi_cmd_re = re.compile("pw=([a-f0-9]{32})(&?.*)&_=(\d+)$")
        self.ospi_cmd_re_cm = re.compile("(.*)&pw=([a-f0-9]{32})&_=(\d+)$")
        self.logger = logging.getLogger(__name__)

    def handle_request(self, environ, start_response):

        script_name = environ["SCRIPT_NAME"][1:]
        query_string = environ["QUERY_STRING"]

        self.logger.debug(f'\n   script_name {script_name}\n    query_string {query_string}.\n')

        try:
            request_body_size = int(environ.get('CONTENT_LENGTH', 0))
        except(ValueError):
            request_body_size = 0

        if request_body_size != 0:
            request_body = environ['wsgi.input'].read(request_body_size)

        start_response('200 OK', [('Content-Type', 'application/json')])

        if script_name == "cm" or script_name == "pq":
            ospi_cmd_match = self.ospi_cmd_re_cm.match(query_string)
        else: ospi_cmd_match = self.ospi_cmd_re.match(query_string)

        if ospi_cmd_match is None:
            self.logger.error(f'\n    Match None on cmd: {query_string}.')
            return['{"result":18}']

        if script_name == "cm" or script_name == "pq":
            *cmd, pwd, epoch_time = ospi_cmd_match.groups()
        else: pwd, *cmd, epoch_time = ospi_cmd_match.groups()
        pw = ospi_db.db["pw"]
        ipas = ospi_db.db["options"]["ipas"]
        ignore_password = ipas != 0
        if not pwd == pw and not ignore_password:
            return['{"result":2}']

#        dt = datetime.fromtimestamp(int(int(epoch_time)/1000)).\
#                                    strftime("%Y-%m-%d %H:%M:%S")

        match script_name:
            case "sp":
                ret_val = sp.handle(pw, ignore_password, cmd)
                return ret_val
            case "jp":
                ret_val = jp.handle()
            case "jo":
                ret_val = jo.handle()
            case "jc":
                ret_val = jc.handle()
            case "cv":
                ret_val = cv.handle(cmd)
            case "co":
                ret_val = co.handle(cmd)
            case "jn":
                ret_val = jn.handle()
            case "je":
                ret_val = je.handle()
            case "cs": 
                ret_val = cs.handle(cmd)
            case "js":
                ret_val = js.handle()
            case "cm":
                ret_val = cm.handle(cmd) #whacky format for cm??
            case "mp":
                ret_val = mp.handle(cmd)
            case "cp":
                ret_val = cp.handle(cmd)
            case "dp":
                ret_val = dp.handle(cmd)
            case "up":
                ret_val = up.handle(cmd)
            case "cr":
                ret_val = cr.handle(cmd)
            case "dl":
                ret_val = dl.handle(cmd)
            case "jl":
                ret_val = jl.handle(cmd)
            case "cu":
                ret_val = cu.handle(cmd)
            case "ja":
                ret_val = ja.handle()
            case "pq":
                ret_val = pq.handle(cmd) # whacky format for pq??
            case "db": # can't figure out how to get js to generate??
                ret_val = ['{"result":18}']
            case "jx":
                ret_val = jx.handle(cmd)
            case "cx":
                ret_val = cx.handle(cmd, request_body)
            case _:
                self.logger.error(f'\n    Unmapped script name: {script_name}.  Should never get here?\n')
# Shouldn't ever get here because lighttpd should only map proper script name set.
                return['{"result":18}']

        self.logger.debug(f'\n    ret_val sent back to js: {ret_val}.\n')
        return ret_val


if __name__ == "__main__":

    from time import sleep

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
#    ospi_db_i.init_db("db_file", "/var/www/html/ospi_data/ospi_defaults.txt")

    DBFILE = "test/db_file"

    ospi = ospi_fcgi_top()

    def  print_start_response(status, content_type):
        print(f'{status}  {content_type}')

    pw = ospi_db.db["pw"]

# bad format
    environ = {"SCRIPT_NAME": "/sp", "QUERY_STRING": "w="+pw+"&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))

    environ = {"SCRIPT_NAME": "/sp", "QUERY_STRING": "pw="+pw+"&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))

# bad password
    environ = {"SCRIPT_NAME": "/sp", "QUERY_STRING": "pw="+"a6d82bced638de3def1e9bbb4983225b"+"&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))

# bad script name
    environ = {"SCRIPT_NAME": "/pp", "QUERY_STRING": "pw="+pw+"&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))

# correct log in
    environ = {"SCRIPT_NAME": "/sp", "QUERY_STRING": "pw="+pw+"&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))

# change pw
    environ = {"SCRIPT_NAME": "/sp", "QUERY_STRING": "pw="+pw+"&npw=a6d82bced638de3def1e9bbb4983225b&cpw=a6d82bced638de3def1e9bbb4983225b&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))

    pw='a6d82bced638de3def1e9bbb4983225b'
# test new pw
    environ = {"SCRIPT_NAME": "/sp", "QUERY_STRING": "pw="+pw+"&npw=a6d82bced638de3def1e9bbb4983225b&cpw=a6d82bced638de3def1e9bbb4983225b&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))  

# set back to old pw
    environ = {"SCRIPT_NAME": "/sp", "QUERY_STRING": "pw="+pw+"&npw=a6d82bced638de3def1e9bbb4983225c&cpw=a6d82bced638de3def1e9bbb4983225c&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))  

    pw='a6d82bced638de3def1e9bbb4983225c'
    environ = {"SCRIPT_NAME": "/cv", "QUERY_STRING": "pw="+pw+"&en=0" + "&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))  

    pw='a6d82bced638de3def1e9bbb4983225c'
    environ = {"SCRIPT_NAME": "/ja", "QUERY_STRING": "pw="+pw+"&en=0" + "&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))  
    
    pw='a6d82bced638de3def1e9bbb4983225c'
    environ = {"SCRIPT_NAME": "/cs", "QUERY_STRING": "pw="+pw + "&_=1702503417796"}
    print("try cs")
    print(ospi.handle_request(environ, print_start_response))  
    
    pw='a6d82bced638de3def1e9bbb4983225c'
    environ = {"SCRIPT_NAME": "/cm", "QUERY_STRING": "&sid=12&en=1&t=333&ssta=1"+"pw="+pw + "&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))  

    sleep(3)
    pw='a6d82bced638de3def1e9bbb4983225c'
    environ = {"SCRIPT_NAME": "/js", "QUERY_STRING": "pw="+pw + "&_=1702503417796"}
    print(ospi.handle_request(environ, print_start_response))  
