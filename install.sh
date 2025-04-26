# outline of how to install.   Not tested bash code
# cut the lines and run them

sudo mkdir /var/www/cgi-bin

sudo ln -s /home/leith/ospi_py/src/cgi-bin/ospi_fcgi.py /var/www/cgi-bin/ospi_py
sudo ln -s /home/leith/ospi_py/config/ospi_defaults.txt /var/www/cgi-bin/ospi_defaults.txt

sudo mkdir -p /srv/ospi_py/water_logs
sudo chown -R www-data:www-data /srv/ospi_py

sudo ln -s /home/leith/ospi_py/html /var/www/html/ospi_py

sudo /usr/sbin/lighty-enable-mod <fastcgi>

sudo ln -sf /home/leith/ospi_py/config/lighttpd.conf /etc/lighttpd

add "dtoverlay=w1-gpio,gpiopin=4" to /boot/firmware/config.txt

chmod 755 /home/leith    www-data needs to reach files 



