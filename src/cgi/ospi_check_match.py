#!/var/www/html/python3_11/bin/python3.11

import logging
from datetime import date
import time

class ospi_check_match():

    def __init__ (self, ospi_db):
        self.ospi_db = ospi_db
        self.logger = logging.getLogger(__name__)

    def starttime_decode(self, t):
        # If negative, disable starttime.   t is int_16 in C++ code.
        if t >> 15 & 0b1 == 0b1 : return -1
        offset = t & 0x7ff
        # sign bit
        if t >> 12 & 0b1 == 0b1 : offset = -offset
        # sunset bit
        if t >> 14 & 0b1 == 0b1:
            t = self.ospi_db.db["settings"]["sunrise"] + offset
            if t < 0 : t = 0
        elif t >> 13 & 0b1 == 0b1:
            t = 1440 + self.ospi_db.db["settings"]["sunset"] + offset
            if t >= 1440 : t = 1439
        return t

    def check_day_match(self, t):
        ret_val = True
        dt = date.fromtimestamp(t)
        day_of_month = dt.day
        month_number = dt.month
        day_of_week = dt.weekday()
        day_is_even = True if day_of_month % 2 == 0 else False

        self.logger.debug(f'\n    day of month: {day_of_month} month: {month_number}' + \
                          f' day of week: {day_of_week}' + \
                          f' even: {day_is_even}\n')

        other_endr = self.prog[6][0]
        endr = self.prog[0] >> 7 & 0x1
        # ?? Apparently these two enable range bits are duplicates.  Go with the one in the flag bits
        dr_from = self.prog[6][1]
        to = self.prog[6][2]
        date_range_number = (month_number << 5) + day_of_month
        if endr == 1:
            if (dr_from <= to and (date_range_number < dr_from or date_range_number > to)) or \
               (to < dr_from and (date_range_number > to and date_range_number < dr_from)): ret_val = False

        if ret_val == True :
            prog_type = self.prog[0] >> 4 & 0x3
            match prog_type:
                case 0b00:     # weekday
                    water_days = self.prog[1]
                    if not (water_days & 0x01 << day_of_week) : ret_val = False
                case 0b11:     # interval
                    remainder = self.prog[1]
                    interval = self.prog[2]
                    if (int(self.curr_time/(86400))) % interval != remainder : ret_val = False
                case _: self.logger.error(f'\n    Undefined program type: {prog_type}\n')

        if ret_val == True :
            odd_even_type = self.prog[0] >> 2 & 0x3
            match odd_even_type:
                case 0b00: 
                    pass                                    # none
                case 0b01: 
                    if not day_is_even : ret_val = False       # odd day restriction
                case 0b10: 
                    if day_is_even : ret_val = False           # even day restriction
                case _: 
                    self.logger.error(f'\n    Undefined even_odd restriction: {odd_even_type}\n')

        self.logger.debug(f'\n    check_day_match: {ret_val}.\n')
        return ret_val

    def check_match(self, curr_time, prog):
        self.curr_time = curr_time
        self.prog = prog
        ret_val = False
        if self.prog[0] & 0b1 :
            start = self.starttime_decode(self.prog[3][0])
            repeat = self.prog[3][1]
            interval = self.prog[3][2]
            tt = time.localtime(self.curr_time)
            self.logger.debug(f'\n    time: {tt}\n' + \
                              f'    {prog}')
            day_minute = tt.tm_hour * 60 + tt.tm_min
            self.logger.debug(f'\n    day_minute: {day_minute}\n')
            starttime_type = self.prog[0] >> 6 & 0b1
            if self.check_day_match(self.curr_time) : 
                if starttime_type == 0b1:
                    # step through the four simple start times
                    for ii in range(0,4) :
                        self.logger.debug(f'\n    day_minute: {day_minute} starttime_decode: {self.starttime_decode(self.prog[3][ii])}')
                        if day_minute == self.starttime_decode(self.prog[3][ii]) : 
                            ret_val = True
                else:
                    # interval
                    if day_minute == start : return True
                    if day_minute > start and not interval == 0:
                        interval_count = (day_minute - start) / interval
                        if interval_count * interval == (day_minute - start and interval_count <= repeat) : 
                            ret_val = True

            # to proceed, program has to be repeating and interval not zero
            if (starttime_type == 0b0 and interval != 0) :
                # Assume program ran overnight
                if self.check_day_match(self.curr_time - 86400) :
                    interval_count = (day_minute - start + 1440) / interval
                    if interval_count * interval == (day_minute - start + 1440 and interval_count <= repeat) : 
                        ret_val = True
 
        self.logger.debug(f'\n    check_match: {ret_val}.\n')
        return ret_val

if __name__ == "__main__":

    from logging.handlers import RotatingFileHandler

    LOGFILE = "log"

    logging.basicConfig(format='%(asctime)s %(name)s %(module)s:%(lineno)d ' +
                               '%(levelname)s:%(message)s',
                        handlers=[RotatingFileHandler(LOGFILE, 
                                                      maxBytes=30000, 
                                                      backupCount=5)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    from cgi.ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db("db_file", "src/ospi_defaults.txt")

    cm = ospi_check_match(ospi_db_i)

    enable_bit = 0b1 << 0
    even_odd  = 0b10 << 2
    prog_type = 0b00 << 4  # schedule type weekday
    start_time = 0b1 << 6
    date_range = 0b1 << 7
    flag = date_range + start_time + prog_type + even_odd + enable_bit
    days0 = 0b100  # Wednesday
    start0 = 930         # 15:30
    start1 = 0b1 << 15   # negative, disabled
    start2 = 0b1 << 15   # negative, disabled
    start3 = 0b1 << 15   # negative, disabled
    prog = [flag, days0, 2, [start0, start1, start2, start3], [1200, 2400, 3600, 2400, 600, 2040, 2040, 1500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'turf', [0, 33, 415]]
    import time
#                                    y    m   d  h  m  s
    ts = time.mktime(time.strptime("2024 feb 21 15 30 25", "%Y %b %d %H %M %S"))
    
    print (cm.check_match(ts, prog))

    start0 = 0b1 << 15   # negative, disabled
    start1 = 40          # 40 minutes after midnight
    start2 = 0b1 << 15   # negative, disabled
    start3 = 0b1 << 15   # negative, disabled
    prog = [flag, days0, 2, [start0, start1, start2, start3], [1200, 2400, 3600, 2400, 600, 2040, 2040, 1500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'turf', [0, 33, 415]]

#                        y    m   d  h  m  s
    tt = time.strptime("2024 feb 21 00 40 25", "%Y %b %d %H %M %S")
    ts = time.mktime(tt)
    print (cm.check_match(ts, prog))

    start0 = 0b1 << 15   # negative, disabled
    start1 = 0b1 << 15   # negative, disabled
    start2 = 0b1 << 14 | 100  # sunrise + 100
    start3 = 0b1 << 15   # negative, disabled
    prog = [flag, days0, 2, [start0, start1, start2, start3], [1200, 2400, 3600, 2400, 600, 2040, 2040, 1500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'turf', [0, 33, 415]]

#                        y    m   d  h  m  s
    tt = time.strptime("2024 feb 21 08 42 25", "%Y %b %d %H %M %S")
    ts = time.mktime(tt)
    print (cm.check_match(ts, prog))

    start0 = 0b1 << 15   # negative, disabled
    start1 = 0b1 << 15   # negative, disabled
    start2 = 0b1 << 15   # negative, disabled
    start3 = 0b1 << 13 | 0b1 << 12 | 50  # sunset -50
    prog = [flag, days0, 2, [start0, start1, start2, start3], [1200, 2400, 3600, 2400, 600, 2040, 2040, 1500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'turf', [0, 33, 415]]

#                        y    m   d  h  m  s
    tt = time.strptime("2024 feb 21 16 37 25", "%Y %b %d %H %M %S")
    ts = time.mktime(tt)
    print (cm.check_match(ts, prog))
