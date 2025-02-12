# outline of how to install.   Not tested bash code

sudo ln -s /home/leith/ospi_py/src/cgi-bin/ospi_fcgi.py /var/www/cgi-bin/ospi_py

sudo mkdir -p /srv/ospi_py/water_logs
sudo chown -R wwww-data:www-data /srv/ospi_py

sudo mkdir -p /var/www/html/ospi_py

