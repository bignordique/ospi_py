

# Not sure why the "pin_factory" has to be specified this way.  But it works.

import logging
from gpiozero import Button
from time import sleep
#from gpiozero.pins.native import NativeFactory
#my_fact = NativeFactory()
import threading
from signal import pause

class ospi_water_meter():
    
    def __init__(self):
        self.button = Button(26)
        self.pressed_count = 0
        self.released_count = 0
        self.thread = threading.Thread(target=self.run, daemon=True)
        self.thread.start()

    def run(self):
        while True:
#            self.button.when_pressed = self.pressed
            self.button.when_released = self.released
            pause()

    def pressed(self):
        self.pressed_count += 1
        print(f'pressed {self.pressed_count}\n')

    def released(self):
        self.released_count += 1
        print(f'released {self.released_count}\n')


if __name__ == "__main__" :
    water_meter_inst = ospi_water_meter()

 #   while True:
#      sleep(1)

    while True:
        if water_meter_inst.button.is_pressed:
            print(f'is_pressed\n')
        else:
            print(f'not is_pressed\n')
        sleep(1)

