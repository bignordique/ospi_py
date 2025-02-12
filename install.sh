# outline of how to install.   Not tested bash code

sudo ln -s /home/leith/ospi_py/src/cgi-bin/ospi_fcgi.py /var/www/cgi-bin/ospi_py

sudo mkdir -p /srv/ospi_py/water_logs
sudo chown -R wwww-data:www-data /srv/ospi_py

sudo ln -s /home/leith/ospi_py/html ospi_py

sudo ls -sf /home/leith/ospi_py/config/lighttpd.conf /etc/lighttpd



