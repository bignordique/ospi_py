#!/home/leith/ospi_py/.venv/bin/python

from flup.server.fcgi import WSGIServer
from ospi_fcgi_top import ospi_fcgi_top
import logging
from logging.handlers import RotatingFileHandler
import ospi_defs
import sys

logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                           '%(levelname)s:%(message)s',
                    handlers=[RotatingFileHandler(ospi_defs.PYTHON_LOG_DIR, maxBytes=30000, 
                                                  backupCount=2)],
                    level=logging.DEBUG)

logger = logging.getLogger(__name__)

logging.getLogger('tasks_midnight').setLevel(logging.INFO)
logging.getLogger('ospi_sunrise_sunset').setLevel(logging.DEBUG)
logging.getLogger('ospi_fcgi_top').setLevel(logging.INFO)
logging.getLogger('ospi_cv').setLevel(logging.INFO)
logging.getLogger('ospi_co').setLevel(logging.INFO)
logging.getLogger('ospi_ja').setLevel(logging.INFO)
logging.getLogger('ospi_jc').setLevel(logging.INFO)
logging.getLogger('ospi_je').setLevel(logging.INFO)
logging.getLogger('ospi_jl').setLevel(logging.INFO)
logging.getLogger('ospi_jn').setLevel(logging.INFO)
logging.getLogger('ospi_jo').setLevel(logging.INFO)
logging.getLogger('ospi_jp').setLevel(logging.INFO)
logging.getLogger('ospi_js').setLevel(logging.INFO)
logging.getLogger('ospi_jx').setLevel(logging.INFO)
logging.getLogger('ospi_cs').setLevel(logging.INFO)
logging.getLogger('ospi_mp').setLevel(logging.INFO)
logging.getLogger('ospi_ol').setLevel(logging.INFO)
logging.getLogger('ospi_cm').setLevel(logging.INFO)
logging.getLogger('ospi_cr').setLevel(logging.INFO)
logging.getLogger('ospi_cp').setLevel(logging.INFO)
logging.getLogger('ospi_dp').setLevel(logging.INFO)
logging.getLogger('ospi_up').setLevel(logging.INFO)
logging.getLogger('ospi_dl').setLevel(logging.INFO)
logging.getLogger('ospi_cu').setLevel(logging.INFO)
logging.getLogger('ospi_cx').setLevel(logging.INFO)
logging.getLogger('ospi_pq').setLevel(logging.INFO)
logging.getLogger('ospi_mcp3221').setLevel(logging.INFO)
logging.getLogger('ospi_w1_rd_temps').setLevel(logging.INFO)
logging.getLogger('ospi_engine').setLevel(logging.INFO)
logging.getLogger('ospi_check_match').setLevel(logging.INFO)
logging.getLogger('ospi_check_match.starttime_decode').setLevel(logging.INFO)
logging.getLogger('ospi_station_bits').setLevel(logging.INFO)
logging.getLogger('ospi_gpio_zones').setLevel(logging.INFO)
logging.getLogger('ospi_db').setLevel(logging.INFO)
logging.getLogger('ospi_weather').setLevel(logging.INFO)
logging.getLogger('ospi_water_meter').setLevel(logging.INFO)
logging.getLogger('ospi_fuse').setLevel(logging.INFO)
logging.getLogger('ospi_log').setLevel(logging.INFO)

fcgi_top = ospi_fcgi_top()

#logger.info("\n    Startup.\n")

if len(sys.argv) > 1:
    print("testbench")
else:
    WSGIServer(fcgi_top.handle_request).run()


