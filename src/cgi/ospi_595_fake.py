#!/var/www/html/python3_11/bin/python3.11

import logging
import ospi_defs

class ospi_595_gpio():

    def __init__ (self):
        self.logger = logging.getLogger(__name__)   

# map station_bits to organization of 595s.  Will work up to 32 stations.
    def update_595(self, data, channels):
        self.logger.debug(f'\n    fake - input data {data}\n')

