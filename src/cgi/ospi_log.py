#!/var/www/html/python3_11/bin/python3.11
import logging
import ospi_defs
import os
import shutil
from ospi_db import ospi_db
import time
import re

class ospi_log:

    def __init__ (self, ospi_db) :
        self.ospi_db = ospi_db
        self.water_log_dir = ospi_defs.WATER_LOG_DIR
        self.logger = logging.getLogger(__name__)
        self.warning_sent = False

    def write_log(self, rpt_str, time_stamp) :
        if not self.logging_ready() :
            self.logger.debug (f'\n    logging not ready.\n')
            return False
        time_struct = time.gmtime(time_stamp)
        path = self.water_log_dir + "/" + str(time_struct.tm_year)
        if not self.mkdir(path) :
            return False
        path = path + "/" + str(time_struct.tm_mon)
        if not self.mkdir(path) :
            return False
        path = path + "/" + str(time_struct.tm_mday)
        try:
            with open(path, "a", encoding="ascii") as fd :
                os.chmod(path, 0o664)
                ts_int = int(time_stamp)
                readable_time = time.strftime("%d-%H:%M:%S",time.gmtime(ts_int))
                fd.write(f'[{rpt_str},{str(ts_int)},{readable_time}]\n')
        except Exception as e :
            self.logger.error(f'\n    file open error: "{e}" on path: "{path}"\n')

    def get_log(self, start_timestamp, end_timestamp, log_type) :
        self.logger.debug(f'\n    get_log start: {start_timestamp}' + \
                          f' end: {end_timestamp} type: {log_type}\n')
        records = self.get_records(start_timestamp, end_timestamp, log_type)
        return records

    def get_hist(self, days, log_type) :
        self.logger.debug(f'\n    get_hist days: {days} type: {log_type}\n')
        today = self.ospi_db.get_utc_stamp(self.logger)
        start = today - days * ospi_defs.SECS_PER_DAY
        records = self.get_records(start, log_type)
        return records

    def delete_log(self, days) :
        self.logger.debug(f'\n    delete_log: {days}\n')
        if days == "all" :
            dir_list = os.listdir(self.water_log_dir)
            for ii in dir_list :
                try :
                    shutil.rmtree(self.water_log_dir + "/" + ii)
                except Exception as e:
                    self.logger.error(f'\n    rmtree exception: "{e}" on path: "{ii}"\n')
        else :
            full_timestamp = days * ospi_defs.SECS_PER_DAY
            ts = time.gmtime(full_timestamp)
            self.remove_tree(self.water_log_dir, [ts.tm_year, ts.tm_mon, ts.tm_mday], True)


#Delete everything up to the given date.   Not generated by the GUI.
    def prune_log(self, timestamp) :
        self.logger.debug(f'\n    prune_log: {timestamp}\n')
        ts = time.gmtime(timestamp)
        self.remove_tree(self.water_log_dir, [ts.tm_year, ts.tm_mon, ts.tm_mday], False)

# assuming listdir returns valid info, should need to guard rmdir/remove with try/except
    def remove_tree(self, path, date, single_file):
        dir_list = os.listdir(path)
        for ii in dir_list :
            if int(ii) <= date[0] and not single_file or int(ii) == date[0] :
                next_path = path + "/" + ii
                if os.path.isdir(next_path) :
                    next_date = date[1:]
                    if int(ii) < date[0] :
                        next_date[0] = 33
                    self.remove_tree(next_path, next_date, single_file)
                    if os.listdir(next_path) == [] :
                        os.rmdir(next_path)
                else :
                    os.remove(next_path)

    def mkdir(self, path) :
        try :
            os.mkdir(path)
            os.chmod(path, 0o775)
        except FileExistsError :
            pass
        except Exception as e:
            self.logger.error(f'\n    mkdir exception: "{e}" on path: "{path}"\n')
            return False
        return True

    def get_path (self, time_stamp) :
        ts = time.gmtime(time_stamp)
        return self.water_log_dir + "/" + str(ts.tm_year) + "/" + \
                     str(ts.tm_mon) + "/" + str(ts.tm_mday)

    def get_records(self, start_timestamp, end_timestamp, log_type) :
        records = []
        end = end_timestamp + ospi_defs.SECS_PER_DAY
        for ii in range(start_timestamp, end, ospi_defs.SECS_PER_DAY) :
            path = self.get_path(ii)
            if os.path.exists(path) :
                try :
                    with open (path, "r") as fd :
                        for line in fd :
                            m = re.match(r'\[(\d+),(\d+),(\d+),(\d+),[0-9-:]*\]', line)
                            if m is not None and len(m.groups()) == 4 and log_type is None:
                                records.append([int(m.group(1)), int(m.group(2)),\
                                                int(m.group(3)), int(m.group(4))])
                            else :
                                m = re.match(r'\[(\d+),"(\w\w)",(\d+),(\d+),[0-9-:]*\]', line)
                                if m is not None and len(m.groups()) == 4 and \
                                        (log_type is None or m.group(2) == log_type) :
                                    records.append([int(m.group(1)), m.group(2),\
                                                int(m.group(3)), int(m.group(4))])
                except Exception as e:
                    self.logger.error(f'\n    error: "{e.message}" in log file read.\n')
        return records

# extra helpful directory presence check :-)
    def logging_ready(self) :
        if self.ospi_db.db["options"]["lg"] == 0 :
            return False
        elif not os.path.exists(self.water_log_dir) :
            if not self.warning_sent :
                self.logger.warning (f'\n    Water log enabled, {ospi_defs.WATER_LOG_DIR}' + \
                                     f' path non existent.\n')
                self.warning_sent = True
            return False
        elif not os.path.isdir(self.water_log_dir) :
            if not self.warning_sent :
                self.logger.warning (f'\n    Water log enabled, {ospi_defs.WATER_LOG_DIR}' + \
                                     f' path exists, not directory.\n')
                self.warning_sent = True
            return False
        
        return True

            
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

    
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    log = ospi_log(ospi_db_i)
    log.water_log_dir = "test/water_logs"
    os.makedirs(log.water_log_dir, exist_ok=True)

    print(log.ospi_db.db["options"]["lg"])

    log.ospi_db.db["options"]["lg"] = 0

    log.write_log("0,0,0", 1234)

    log.ospi_db.db["options"]["lg"] = 1

    log.write_log("1,1,1", 4321)

    ts1 = int(time.mktime(time.strptime("2023 dec 26 15 34 25", "%Y %b %d %H %M %S")))
    ts2 = int(time.mktime(time.strptime("2023 dec 31 15 34 25", "%Y %b %d %H %M %S")))
    ts3 = int(time.mktime(time.strptime("2024 jan 3 15 35 25", "%Y %b %d %H %M %S")))
    ts4 = int(time.mktime(time.strptime("2024 jan 4 15 35 25", "%Y %b %d %H %M %S")))
    ts_end = int(time.mktime(time.strptime("2024 feb 27 15 36 25", "%Y %b %d %H %M %S"))) 

    def write_some_logs():
        log.write_log("1,2,3", ts1)
        log.write_log("4,5,6", ts2)
        log.write_log("7,8,9", ts3)
        log.write_log("10,11,12", ts4)
        log.write_log('4,"rd",6', ts_end)
        log.write_log('14,"wl",16', ts_end)
        log.write_log('17,18,19', ts_end)


    write_some_logs()

    print(log.get_log(4322, ts_end, None))

    print(log.get_log(ts1, ts_end, "rd"))

    print(log.get_log(ts_end, ts_end, "wl"))

    print(log.get_log(ts1, ts2, "wl"))    # should be empty
    print(log.get_log(ts_end, ts_end, None))

    def list_files(startpath):
        for root, dirs, files in os.walk(startpath):
            level = root.replace(startpath, '').count(os.sep)
            indent = ' ' * 4 * (level)
            print('{}{}/'.format(indent, os.path.basename(root)))
            subindent = ' ' * 4 * (level + 1)
            for f in files:
                print('{}{}'.format(subindent, f))

    list_files (log.water_log_dir)

    log.delete_log(int(ts3/ospi_defs.SECS_PER_DAY))

#    print (os.system("/usr/bin/tree water_log_dir"))

    write_some_logs()

    log.prune_log(ts4)

#   print (os.system("/usr/bin/tree water_log_dir"))

    log.delete_log("all")
