#!/var/www/html/python3_11/bin/python3.11

#Diffs from original OpenSprinkler
# -Zero dependence on "The Cloud".
# -32 stations max
# -No remote stations
# -No special stations
# -Allows specification of station delay on a per program basis
# -Max run_q entries is 200


import json
import logging
import time
import ospi_defs as ospi_defs
from ospi_log import ospi_log

class ospi_engine():

    def __init__ (self, ospi_db, check_match, station_bits, water_logs):
        self.ospi_db = ospi_db
        self.cm = check_match
        self.sb = station_bits
        self.water_logs = water_logs
        self.last_minute = 0
        self.run_q = []
        self.station_qid = [255] * ospi_defs.MAX_NUM_STATIONS
        self.nqueue = 0
        self.program_busy = False
        self.last_seq_stop_times = [0] * ospi_defs.NUM_SEQ_GROUPS
        self.pause_state = False
        self.pause_timer = 0
        self.do_loop_count = 0
        self.lastrun = {"station":None, "program":None, "duration":None, "endtime":None, "clicks_run":0}
        self.raindelay_start_time = 0  # on powerfail, keep it simple.   Set to zero and suppress log.
        self.logger = logging.getLogger(__name__)
        self.first_loop = True
        self.shut_off_timer = 0


    def get_ps(self):
        ps = []
        for sid in range (0, self.ospi_db.db["status"]["nstations"]) :
            qid = self.station_qid[sid]
            gid = self.ospi_db.db["stations"]["stn_grp"][sid]
            if qid != 255:
                entry = self.run_q[qid]
                start = entry["st"]
                rem = entry["deque_time"] - self.ospi_db.get_utc_stamp(self.logger) 
                pid = entry["pid"] + 1
                ps.append([pid, rem, start, gid])
            else:
                ps.append([0,0,0,gid])
        return ps

    def get_current_clicks(self):
        if len(self.run_q) == 0:
            return 0
        else:
            return self.ospi_db.db["settings"]["wm_clicks"] - self.run_q[0]["start_clicks"]

# Not used anywhere?
 #   def get_pause_status(self) :
 #       return (self.pause_state, self.pause_timer)

    def get_sbits(self):
        sbits = []
        byte = 0
        for sid in range (0, self.ospi_db.db["status"]["nstations"]) :
            if self.sb.get_station_bit(sid):
                byte = byte | 0b1 << sid % 8
            if sid % 8 == 7 :
                sbits.append(byte)
                byte = 0
        return sbits

    def poop_q_string(self, curr_time, msg) :
        tt = time.localtime(curr_time)
        run_q_list = f'\n    {msg}  {tt.tm_year} {tt.tm_mon} {tt.tm_mday} {tt.tm_hour} {tt.tm_min}'
        run_q_list += f'  {curr_time}'
        run_q_list += f'  loop: {self.do_loop_count}  nqueue: {self.nqueue}  busy: {self.program_busy}\n'
        run_q_list += f'    station_qid: {self.station_qid[0:17]}\n'
 #       run_q_list += f'    station_qid: {self.station_qid[0:]}\n'
        station_list = []
        for ii in range (0, ospi_defs.MAX_NUM_STATIONS):
            if self.sb.station_bits >> ii & 0b1 == 1 :
                station_list.append(ii+1)
        run_q_list += f'    station_list: {station_list}\n'
        for q_index in range(0, self.nqueue) :
            entry = self.run_q[q_index]
            run_q_list += f'    {q_index} {entry} {entry["st"] - curr_time}'
            run_q_list += f' {entry["deque_time"] - curr_time}\n'
        return run_q_list

    def check_progs(self, curr_time) :
        self.do_loop_count += 1

        self.logger.debug(self.poop_q_string(curr_time, "do_loop"))

#        self.wx.apply_monthly_adjustment()

        match_found = False

        for pid in range(0, self.ospi_db.db["programs"]["nprogs"]):
            prog = self.ospi_db.db["programs"]["pd"][pid]

            if self.cm.check_match(curr_time, prog) == True:
                for sid in range(0, self.ospi_db.db["status"]["nstations"]):
                    bid, s = self.to_bid_s(sid) 
# skip if master station
                    if self.ospi_db.db["options"]["mas"] == sid + 1 or \
                            self.ospi_db.db["options"]["mas2"] == sid + 1 :
                        continue
# Duration > 0 and not disabled
                    if prog[4][sid] > 0 and self.ospi_db.db["stations"]["stn_dis"][bid] & 0b1 << s == 0:
                        water_time = self.water_time_resolve(prog[4][sid])
# Use weather
                        if prog[0] >> 1 & 0b1 == 0b1 : use_wx = True
                        else:use_wx = False

                        wl = self.ospi_db.db["options"]["wl"]

                        if use_wx: water_time = int(water_time * wl / 100)
# No water if weather makes water_time really small
                        if wl < 20 and water_time < 10 : water_time = 0
                        if not use_wx: wl = None

# Shouldn't we use self.nqueue instead of len(self.run_q)?
                        if water_time > 0 and len(self.run_q) <= ospi_defs.MAX_RUNQ_ENTRIES :
                            self.nqueue += 1
                            self.run_q.append({"st": 0,
                                               "wl": wl,
                                               "dur" : water_time,
                                               "sid" : sid,
                                               "pid" : pid,
                                               "deque_time": 0,
                                               "start_clicks" : 0})
                            match_found = True
                        
        if match_found : 
            self.schedule_all_stations(curr_time) 

# pass in ospi_time to make it easy to minipulate in test harnesses
    def do_loop(self, ospi_time):
        self.curr_time = ospi_time
        if self.first_loop:
            ts_int = int(self.ospi_db.db["settings"]["wm_timestamp"])
            readable_time = time.strftime("%Y/%m/%d-%H:%M:%S",time.gmtime(ts_int))
            self.logger.info(f'\n    First loop.  wm_timestamp: {readable_time}  ' + \
                             f'wm_clicks: {self.ospi_db.db["settings"]["wm_clicks"]}\n')
            self.first_loop = False
        self.curr_minute = int(self.curr_time/60)

#        self.logger.info(f'\n    self.pause_state: {self.pause_state}  self.pause_timer: {self.pause_timer}' + \
#                         f'\n    pq: {self.ospi_db.db["settings"]["pq"]} \n')

        if self.shut_off_timer != 0:
            self.shut_off_timer -= 1

        if self.ospi_db.db["settings"]["rd"] == 1 :
            if self.curr_time > self.ospi_db.db["settings"]["rdst"] :
                self.raindelay_stop()

        if self.ospi_db.db["settings"]["rd"] == 0 and self.ospi_db.db["settings"]["rdst"] > self.curr_time:
            self.raindelay_start()

        if self.curr_minute > self.last_minute :
            self.last_minute = self.curr_minute
            self.check_progs(self.curr_time)
        
        self.do_queue(self.curr_time)

    def do_queue(self, curr_time) :
           
# maintain pointer from sid to run_q qid
        if (self.program_busy) :
            for qid in range(0, self.nqueue) :
                entry = self.run_q[qid]  
                sid = entry["sid"]
                sqi = self.station_qid[sid]
# skip station has queue element with earlier start time, enables station to be in run_q multiple times.
                if sqi < 255 and self.run_q[sqi]["st"] < entry["st"] : continue
                self.station_qid[sid] = qid


# step through stations, index to q entry,  turn on station if time in run_q is appropriate
            if self.nqueue > 0 :
                for sid in range(0, self.ospi_db.db["status"]["nstations"]) :
                    if self.ospi_db.db["options"]["mas"] == sid + 1 : continue
                    if self.ospi_db.db["options"]["mas2"] == sid + 1: continue
                    qid = self.station_qid[sid]
                    if qid == 255 : continue
                    if qid < 0 or qid >= len(self.run_q) :
                        self.logger.error (f'\n    qid out of range  qid: {qid}  len(q): {len(self.run_q)}\n')
                    entry = self.run_q[qid]
                    if not self.sb.get_station_bit(sid) : #and not self.pause_state:
                        if curr_time >= entry["st"] and \
                            curr_time < entry["st"] + entry["dur"] :
                            entry["start_clicks"] = self.ospi_db.db["settings"]["wm_clicks"]
                            self.sb.set_station_bit(sid, 1)

# turn off stations with completed run times.
                    if entry["st"] > 0 :
                        if curr_time >= entry["st"] + entry["dur"] :
                            self.turn_off_station(sid, curr_time, 0)

            for q_index in range(self.nqueue - 1, -1, -1) :
                entry = self.run_q[q_index]
                if entry["dur"] == 0 or curr_time >= entry["deque_time"] :
                    self.dequeue(curr_time, q_index)

            self.process_dynamic_events(curr_time)

            self.sb.apply_all_station_bits()

            self.last_seq_stop_times = [0] * ospi_defs.NUM_SEQ_GROUPS

# traverse run_q and update last_seq_stop_times
            for qid in range(0, self.nqueue) :
                entry = self.run_q[qid]
                sid = entry["sid"]
                gid = self.ospi_db.db["stations"]["stn_grp"][sid]
                sst = entry["st"] + entry["dur"]
                if sst > curr_time :
                    # station not parallel group
                    if gid != 255 and sst > self.last_seq_stop_times[gid] :
                        self.last_seq_stop_times[gid] = sst

# if run_q empty, clean up.   not sure why this "clean up" is necessary.
            if self.nqueue == 0 :
                self.clear_all_station_bits()
                self.sb.apply_all_station_bits()
                self.reset_runtime()
                self.program_busy = False
 #               self.clear_pause() 

# adjust start time for master on/off delays
# for each master, scan through stations.   If station is on and associated with master, turn 
# on master
        for mas in ["", "2"] :
            mas_id = self.ospi_db.db["options"]["mas" + mas]
            if mas_id != 0 :
                mas_on_adj = self.ospi_db.db["options"]["mton" + mas]
                mas_off_adj = self.ospi_db.db["options"]["mtof" + mas]
                masbit = 0
                for sid in range (0, self.ospi_db.db["status"]["nstations"]):
                    if mas_id == sid + 1 : continue
                    if self.station_qid[sid] == 255 : continue    # station not in run_q
                    entry = self.run_q[self.station_qid[sid]]
                    if self.bound_to_master(entry["sid"], mas) :
# mas_on_adj is likely negative
                        if curr_time >= entry["st"] + mas_on_adj and \
                           curr_time <= entry["st"] + entry["dur"] + mas_off_adj :
                               masbit = 1
                self.sb.set_station_bit(mas_id - 1, masbit)

        if self.pause_state :
            if self.pause_timer > 0 :
                self.pause_timer -= 1
                self.clear_all_station_bits()
            else:
                self.clear_pause()

        self.process_dynamic_events(curr_time)

        self.sb.apply_all_station_bits()



    def bound_to_master(self, sid, mas):
        bid, s = self.to_bid_s(sid)
        attributes = self.ospi_db.db["stations"]["masop" + mas][bid] & 0b1 << s
        return False if attributes == 0 else True

    def to_bid_s(self, sid):
        return sid >> 3, sid & 0x7


    def process_dynamic_events(self, curr_time):
        rd = True if self.ospi_db.db["settings"]["rd"] == 1 else False
        if self.nqueue > 0 :  # This test not in original OSPI.   Possibly looking at null entries.
            for sid in range(0, self.ospi_db.db["status"]["nstations"]) :
                if self.ospi_db.db["options"]["mas"] == sid + 1 : continue
                if self.ospi_db.db["options"]["mas2"] == sid + 1 : continue
                bid, s = self.to_bid_s(sid)
                igrd = False if self.ospi_db.db["stations"]["ignore_rain"][bid] & 0x1 << s == 0 else True
                qid = self.station_qid[sid]
                if qid == 255 : continue
                entry = self.run_q[qid]
                if not self.ospi_db.db["settings"]["en"] or rd and not igrd  :
                    entry["deque_time"] = curr_time
                    self.turn_off_station(sid, curr_time, 0)


    def dequeue(self, curr_time, q_index):
        if q_index > self.nqueue : return
# Think the below is equivalent to q_index != 0
        if q_index < self.nqueue - 1 :
            self.run_q[q_index] = self.run_q[self.nqueue - 1]
            if self.station_qid[self.run_q[q_index]["sid"]] == self.nqueue - 1 :
                self.station_qid[self.run_q[q_index]["sid"]] = q_index
        self.run_q.pop(self.nqueue - 1)
        self.nqueue -= 1
        self.logger.debug(self.poop_q_string(curr_time, "dequeue"))


    def reset_runtime(self):
        self.station_qid = [255] * ospi_defs.MAX_NUM_STATIONS
        self.nqueue = 0
        self.run_q = []
        self.last_seq_stop_times = [0] * ospi_defs.NUM_SEQ_GROUPS

    # FWIW, this whold pause state thing is spaghetti code.
    def toggle_pause(self, curr_time, dur) :
        if self.pause_state :
            self.resume_stations()
            self.clear_pause()
        else:
            self.pause_state = True
            self.pause_timer = dur
            self.set_pause(curr_time)

    def set_pause(self, curr_time):
        for q_index in range(0, self.nqueue):
            entry = self.run_q[q_index]
            self.turn_off_station(entry["sid"], curr_time)
            if curr_time >= entry["st"] + entry["dur"] :    # should only impact any/all entries in the pause envelope
                continue
            elif curr_time > entry["st"] :
                entry["dur"] -= (curr_time - entry["st"])   # subtract passed run time from duraton
 #           else :
                entry["st"] += self.pause_timer             # add pause timer to start time

 #           entry["deque_time"] += self.pause_timer        # add start time to de queue time

 

            gid = self.ospi_db.db["stations"]["stn_grp"][entry["sid"]]
            if entry["st"] + entry["dur"] > self.last_seq_stop_times[gid] :
                self.last_seq_stop_times[gid] = entry["st"] + entry["dur"]

    def resume_stations(self) :
        for q_index in range(0, self.nqueue):
            entry = self.run_q[q_index]
            entry["st"] -= self.pause_timer
            entry["deque_time"] -= self.pause_timer
            entry["st"] += 1
            entry["deque_time"] += 1

    def clear_pause(self):
        self.pause_state = False
        self.pause_timer = 0
        self.last_seq_stop_times = [0] * ospi_defs.NUM_SEQ_GROUPS

    def reset_all_stations(self) :
        for q_index in range(0, self.nqueue) :
            entry = self.run_q[q_index]
            entry["dur"] = 0

    def reset_all_stations_immediate(self) :
        self.clear_all_station_bits()
        self.sb.apply_all_station_bits()
        self.reset_runtime()
        self.clear_pause()

    def handle_master_adjustments(self, curr_time, entry):
        start_adjust = 0
        dequeue_adj = 0
        for mas in ["", "2"] :
            mas_on_adj = self.ospi_db.db["options"]["mton" + mas]
            mas_off_adj = self.ospi_db.db["options"]["mtof" + mas]
            mas_id = self.ospi_db.db["options"]["mas" + mas]
            if mas_id != 0 and self.bound_to_master(entry["sid"], mas) :
                start_adjust = min([start_adjust, mas_on_adj])
                dequeue_adj = max([dequeue_adj, mas_off_adj])
        if (entry["st"] - curr_time) < abs(start_adjust) :
            entry["st"] += abs(start_adjust)
        entry["deque_time"] = entry["st"] + entry["dur"] + dequeue_adj

    def water_time_decode_signed(self, wt) :
        wt = 240 if wt > 240 else wt
        return (wt-120) * 5

# Sets station start times
    def schedule_all_stations(self, curr_time, delay=1):
        con_start_time = curr_time + delay
        if self.pause_state : con_start_time += self.pause_timer
        station_delay = self.water_time_decode_signed(self.ospi_db.db["options"]["sdt"])
        seq_start_times = [con_start_time] * ospi_defs.NUM_SEQ_GROUPS
        for ii in range(0, ospi_defs.NUM_SEQ_GROUPS) :
            if self.last_seq_stop_times[ii] > curr_time :
                seq_start_times[ii] = self.last_seq_stop_times[ii] + station_delay
        for q_index in range(0, self.nqueue) :
            entry = self.run_q[q_index]
            if entry["st"] > 0 : continue
            if entry["dur"] == 0 : continue
            gid = self.ospi_db.db["stations"]["stn_grp"][entry["sid"]]
            if gid != ospi_defs.PARALLEL_GROUP_ID :
                entry["st"] = seq_start_times[gid]
            else:
                entry["st"] = con_start_time
                con_start_time += 1

            self.handle_master_adjustments(curr_time, entry)
# Day one bug.  Set sequential start time after master adjustment.
            if gid != ospi_defs.PARALLEL_GROUP_ID :
                seq_start_times[gid] = entry["st"] + entry["dur"] + 1
                seq_start_times[gid] += station_delay

            self.program_busy = True
        self.logger.debug(self.poop_q_string(curr_time, "schedule_all_stations"))

    def water_time_resolve(self, v) :
        if v == 65534 :
            return self.ospi_db.db["settings"]["sunrise"]
        elif v == 65535 :
            return self.ospi_db.db["settings"]["sunset"]
        else: return v

    def handle_shift_remaining_stations(self, qid, gid, curr_time):
        entry = self.run_q[qid]
        q_end_time = entry["st"] + entry["dur"]

        if q_end_time > curr_time : 
            remainder = q_end_time - curr_time if entry["st"] < curr_time else entry["dur"]
            for ii in range(0, self.nqueue) :
                entry = self.run_q[ii]
                if ii == qid or \
                       self.ospi_db.db["stations"]["stn_grp"][entry["sid"]] != gid or \
                       self.station_qid[entry["sid"]] == 255 :
                    continue
                if entry["st"] >= q_end_time :
                    entry["st"] -= remainder
                    entry["deque_time"] -= remainder
        self.last_seq_stop_times[gid] -= remainder
        self.last_seq_stop_times[gid] += 1

    def turn_off_station (self, sid, curr_time, shift=0) :
        qid = self.station_qid[sid]
        if qid >= len(self.run_q) : 
            return
        entry = self.run_q[qid]
        force_dequeue = False
        station_bit = self.sb.get_station_bit(sid)
        gid = self.ospi_db.db["stations"]["stn_grp"][sid]
        if shift == 1 and gid != 255 :
            self.handle_shift_remaining_stations(qid, gid, curr_time)
        
        if curr_time >= entry["deque_time"] :
            if (station_bit) :
                force_dequeue = True
            else : 
                self.dequeue(curr_time, qid)
                self.station_qid[sid] = 255
                return
        elif curr_time >= entry["st"] + entry["dur"] : #end time deque time unequal for masters
            if not station_bit :
                 return

        self.sb.set_station_bit(sid, 0)
        self.shut_off_timer = ospi_defs.SHUT_OFF_TIMER

        if curr_time > entry["st"] :
            if self.ospi_db.db["options"]["mas"] != sid + 1 and \
                    self.ospi_db.db["options"]["mas2"] != sid + 1 :
                self.lastrun["station"] = sid
                self.lastrun["program"] = entry["pid"]
                self.lastrun["duration"] = curr_time - entry["st"]
                self.lastrun["endtime"] = curr_time
                self.lastrun["clicks_run"] = self.ospi_db.db["settings"]["wm_clicks"] - entry["start_clicks"]
                self.water_logs.write_log (f'{entry["pid"] + 1},{sid},{self.lastrun["duration"]}',\
                                          self.ospi_db.get_lcl_stamp(self.logger))
                self.water_logs.write_log (f'{entry["pid"] + 1},"fl",{self.lastrun["duration"]}',\
                                          self.ospi_db.get_lcl_stamp(self.logger),self.lastrun["clicks_run"])
 #                                          self.ospi_db.get_lcl_stamp(self.logger),self.do_loop_count)
 #               if not (entry["wl"] is None):
                self.water_logs.write_log (f'{entry["pid"] + 1},"wl",{entry["wl"]}',\
                                          self.ospi_db.get_lcl_stamp(self.logger))

        station_delay = self.water_time_decode_signed(self.ospi_db.db["options"]["sdt"])
# Day one bug.   Parallel group stations have no sequential stop times.
        if gid != 255 :
            if entry["st"] + entry["dur"] + station_delay == self.last_seq_stop_times[gid] :
                self.last_seq_stop_times[gid] = 0

        if force_dequeue :
            self.dequeue(curr_time, qid)
            self.station_qid[sid] = 255

#Original code does not check enable bit for station.
    def manual_run_station (self, curr_time, sid, en, t, ssta) :
        sqi = self.station_qid[sid]
        if en:
            if sqi != 255:
                entry = self.run_q[sqi]
                entry["st"] = 0
                entry["dur"] = t
                entry["sid"] = sid
                entry["pid"] = 99
                entry["deque_time"] = 0
                self.schedule_all_stations(curr_time)
            elif len(self.run_q) <= ospi_defs.MAX_RUNQ_ENTRIES :
                self.nqueue += 1
                self.run_q.append({"st": 0,
                                   "wl" : self.ospi_db.db["options"]["wl"],
                                   "dur" : t,
                                   "sid" : sid,
                                   "pid" : 99,
                                   "deque_time": 0,
                                   "start_clicks" : 0})
                self.schedule_all_stations(curr_time)
        else :
            self.run_q[sqi]["deque_time"] = curr_time
            self.turn_off_station(sid, curr_time, ssta)

# Doesn't seem to be generated by GUI.   Don't believe this is ever used.
    """
    def manual_run_program(self, pid, uwt, curr_time) :
        self.reset_all_stations_immediate()
        match_found = False
        if pid > 0 and pid < 255 :
            prog = self.ospi_db.db["programs"]["pd"][pid]
        for sid in range (0, self.ospi_db.db["status"]["nstations"]) :
            if self.ospi_db.db["options"]["mas"] == sid + 1 or \
                 self.ospi_db.db["options"]["mas2"] == sid + 1 :
                continue
            dur = 60
            if pid == 255 : 
                dur = 2
            elif pid > 0 :
                dur = water_time_resolve(prog["durations"][sid])
            if uwt :
                dur = int(dur * self.ospi_db.db["options"]["wl"] / 100)
            bid, s = self.to_bid_s(sid) 
            if dur > 0 and \  #normal flow has different checks?
               self.ospi_db.db["stations"]["stn_dis"][bid] & 0b1 << s == 0 and \
               len(self.run_q) <= ospi_defs.MAX_RUNQ_ENTRIES : 
                   self.nqueue += 1
                   self.run_q.append({"st": 0,
                                      "wl" : wl,
                                      "dur" : dur,
                                      "sid" : sid,
                                      "pid" : 254,
                                      "deque_time": 0,
                                      "start_clicks" : 0})
                   match_found = True

        if match_found :
            self.schedule_all_stations(curr_time)
    """

    def runonce (self, curr_time, prog) :
        self.reset_all_stations_immediate()
        match_found = False
        for sid in range (0, self.ospi_db.db["status"]["nstations"]) :
            bid, s = self.to_bid_s(sid) 
            if self.ospi_db.db["options"]["mas"] == sid + 1 or \
                 self.ospi_db.db["options"]["mas2"] == sid + 1 or \
                 self.ospi_db.db["stations"]["stn_dis"][bid] & 0b1 << s != 0 or \
                 len(self.run_q) >= ospi_defs.MAX_RUNQ_ENTRIES :
                continue
            dur = prog[sid]
            if dur > 0 :
                   self.nqueue += 1
                   self.run_q.append({"st": 0,
                                      "wl" : None,                                     
                                      "dur" : dur,
                                      "sid" : sid,
                                      "pid" : 254,
                                      "deque_time": 0,
                                      "start_clicks" : 0})
                   match_found = True

        if match_found :
            self.schedule_all_stations(curr_time, 0)
            self.program_busy = True
            self.do_queue(curr_time)

    def raindelay_start(self):
        self.ospi_db.db["settings"]["rd"] = 1
        self.ospi_db.wb_db(self.logger)
        self.raindelay_start_time = self.ospi_db.get_lcl_stamp(self.logger)

    def raindelay_stop(self):
        self.ospi_db.db["settings"]["rd"] = 0
        self.ospi_db.db["settings"]["rdst"] = 0
        self.ospi_db.wb_db(self.logger)
        if self.raindelay_start_time != 0:
            lcl_stamp = self.ospi_db.get_lcl_stamp(self.logger)
            self.water_logs.write_log (f'{0},"rd",{lcl_stamp - self.raindelay_start_time}',\
                                          lcl_stamp)

    def clear_all_station_bits(self):
        if self.sb.station_bits != 0:
            self.shut_off_timer = ospi_defs.SHUT_OFF_TIMER
        self.sb.clear_all_station_bits()

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
                                                      backupCount=2)],
                        level=logging.DEBUG)

    logger = logging.getLogger(__name__)
    logger.info("\n    Startup\n")

    from ospi_db import ospi_db
    ospi_db_i = ospi_db()
    ospi_db_i.init_db(DBFILE, DEFFILE)

    from ospi_station_bits import ospi_station_bits
    from ospi_check_match import ospi_check_match
    from ospi_log import ospi_log
    sb = ospi_station_bits(ospi_db_i)
    cm = ospi_check_match(ospi_db_i)
    ol = ospi_log(ospi_db_i)
    ol.water_log_dir = "test/water_logs"
    logging.getLogger("ospi_station_bits").setLevel(logging.INFO)
    logging.getLogger("ospi_check_match").setLevel(logging.INFO)
    logging.getLogger("ospi_595_fake").setLevel(logging.INFO)
    logging.getLogger("ospi_log").setLevel(logging.DEBUG)

    engine = ospi_engine(ospi_db_i, cm, sb, ol)

#nominal
    enable_bit = 0b1 
    weather = 0b0 << 1
    even_odd  = 0b10 << 2
    prog_type = 0b00 << 4  # schedule type weekday
    start_time = 0b1 << 6
    date_range = 0b1 << 7
    flag = date_range + start_time + prog_type + even_odd + weather + enable_bit
    days0 = 0b100  # Wednesday

    start0 = 930         # 15:30
    start1 = 0b1 << 15   # negative, disabled
    start2 = 0b1 << 15   # negative, disabled
    start3 = 0b1 << 15   # negative, disabled
    prog0 = [flag, days0, 2, [start0, start1, start2, start3], [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'turf', [0, 33, 415]]

    start0 = 0b1 << 15   # negative, disabled
    start1 = 935
    prog1 = [flag, days0, 2, [start0, start1, start2, start3], [0, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'turf', [0, 33, 415]]

    start1 = 0b1 << 15   # negative, disabled
    start2 = 936
    prog2 = [flag, days0, 2, [start0, start1, start2, start3], [0, 0, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'turf', [0, 33, 415]]

    start0 = (0b1 << 14)
    start1 = (0b1 << 14) + 3
    start2 = (0b1 << 13)
    start3 = (0b1 << 13) + (0b1 << 12) + 3
    prog3 = [flag, days0, 2, [start0, start1, start2, start3], [0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'turf', [0, 33, 415]]
 
    ospi_db.db["programs"]["nprogs"] = 4
    ospi_db.db["programs"]["pd"][0] = prog0
    ospi_db.db["programs"]["pd"][1] = prog1
    ospi_db.db["programs"]["pd"][2] = prog2
    ospi_db.db["programs"]["pd"][3] = prog3

    import time
# rain delay not gonna work with test bench time... not so sure.

    def run_ospi(start_time, seconds, test):
        engine.last_minute = 0
        ts = start_time
#        engine.do_loop(ts)
#       exit()
        for ii in range(0, seconds):
            ts+= 1
#            print(engine.get_sbits())
            engine.do_loop(ts)
            time.sleep(0.01)

        logger.info(test)

    m = 30
#                                                y    m   d  h       m     s
    start_time = int(time.mktime(time.strptime("2024 feb 21 15 " +str(m)+" 25", "%Y %b %d %H %M %S")))

    run_ospi(start_time, 700, '\n    basic test ended\n**** \n\n')


    ospi_db.db["options"]["mton"] = 0
    ospi_db.db["options"]["mtof"] = 1
    ospi_db.db["options"]["mas"] = 18
    ospi_db.db["stations"]["masop"][0] = 251
    ospi_db.db["stations"]["stn_grp"][2] = 1
    ospi_db.db["options"]["sdt"] = 120 


    run_ospi(start_time, 700, '\n    master on test ended\n**** \n\n')

    h = 7
    m = 1
#                                                y    m   d       h          m     s
    start_time = int(time.mktime(time.strptime("2024 feb 21 "+str(h)+" "+str(m)+" 25", "%Y %b %d %H %M %S")))
    run_ospi(start_time, 400, '\n    sunrise test ended**** \n\n')

    h = 17
    m = 23
#                                                y    m   d       h          m     s
    start_time = int(time.mktime(time.strptime("2024 feb 21 "+str(h)+" "+str(m)+" 25", "%Y %b %d %H %M %S")))
    run_ospi(start_time, 400, '\n    sunset test ended**** \n\n')
