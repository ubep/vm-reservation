
# vm-reservation

tool for reserving VMs and offering reservation information over an API.


### setup

In order to use the tool, make sure you have *nodejs* and *bower* installed.

#### ui

install dependencies

	bower install

#### backend

to install dependencies,
initialize sqlite database,
creating service script
and start service
just run:

	. install.sh


### how to use 

after installation, the API will be reachable on port 3000.
you can start or stop the service using:

	service vmtool start
	service vmtool stop


### backups

to create backups on a regular basis, add *backup.sh* to the crontab.