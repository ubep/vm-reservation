#!/bin/bash

/usr/local/bin/node /opt/vm-reservation-backend/setup_db.js

cp vmtool /etc/init.d/
cd /etc/init.d/
chmod 777 vmtool

service vmtool start
