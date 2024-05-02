#!/var/www/html/python3_11/bin/python3.11

import logging
import threading
from logging.handlers import TimedRotatingFileHandler, RotatingFileHandler

from time import time, sleep

temps_file = "temps"
logfile = "temps_logfile"
time_format = "%X"
rd_interval = 60

class ospi_w1_rd_temps ():

    def __init__ (self, temps_logger, temp_store_function, win=False):
        self.thread = threading.Thread(target=self.run, daemon=True)
        self.temps_logger = temps_logger
        self.temp_store_function = temp_store_function
        self.win = win
        self.logger = logging.getLogger(__name__)
        sensor_list = (("ospi_box", "012292e9722f"),)
        self.sensors = dict()
        if not win :
            from w1thermsensor import W1ThermSensor, Sensor, Unit
            import w1thermsensor.errors as w1sensorerrors
            for sensor in sensor_list:
                try:
                    therm_sensor = W1ThermSensor(sensor_type=Sensor.DS18B20, sensor_id=sensor[1])
                    self.sensors[sensor[0]] = therm_sensor
                except w1thermsensor.errors.NoSensorFoundError:
                    self.logging.error(f'Missing sensor: {sensor}')
                except Exception as e:
                    self.logger.error(f'Missing {sensor}, cause: {repr(e)}') 

            for key,value in self.sensors.items():
                self.logger.info (f'Temperature sensor(s) found: {key}: {value}')

            self.thread.start()

    def run(self):
        sleep(1) #sometimes get a SensorNotReadyError on first pass without this.
        temps = ""
        while True:
            last_temps = temps
            temps = ""
            for sensor in self.sensors:
                if temps != "": temps += " "
                try:
                    temp = str(round(self.sensors[sensor].get_temperature(Unit.DEGREES_F), 1)) 
                except w1sensorerrors.SensorNotReadyError:
                    self.logger.error(f'{sensor} SensorNotReadyError')
                    temp = "unk"
                except w1sensorerrors.ResetValueError:
                    self.logger.error(f'{sensor} ResetValueError')
                    temp = "unk"
                except Exception as e:
                    self.logger.error(f'{sensor} unknown exception {repr(e)}')
                temps += temp
            if last_temps != temps:
                if self.temps_logger != "": self.temps_logger.debug(f'\n    {temps}')
                self.logger.debug(f'\n    {temps}')
                self.temp_store_function(temps)

            sleep(rd_interval)


if __name__ == "__main__":
    rot_handler = RotatingFileHandler(logfile, maxBytes=30000, backupCount=5)
    logging.basicConfig(format="%(asctime)s %(name)s %(module)s:%(lineno)d "+\
                               "%(levelname)s:%(message)s",
                        handlers = [rot_handler],
                        level=logging.DEBUG) 
    logging.getLogger("asyncio").setLevel(logging.INFO)

    temps_logger = "" #logging.getLogger('temps_logger')
    if temps_logger != "": 
        temps_logger.propagate = False
        temps_logger.addHandler(temps_rot_handler)
        temps_logger.setLevel(logging.INFO)
        temps_rot_handler = \
            TimedRotatingFileHandler(temps_file, when='midnight', backupCount=14)
        
    import platform
    win = True if platform.system() == "Windows" else False

    def print_temp(temp): print(temp)

    rd_interval = 2
    w1_rd_temps_inst = ospi_w1_rd_temps(temps_logger, print_temp, win)
    sleep(5*rd_interval)

