# ospi_py
Reimplementation of Opensprinkler in Python targetting Raspberry PI as the controller.

Objectives:
-Eliminate any/all dependencies on "The Cloud".   Host everything from the PI.
-Replace ad-hoc web server with a "real" webserver.   Run the server as a fast-cgi behind the webserver.   Using lighttpd, but others should work.
-Minimal changes to html/javascript.
