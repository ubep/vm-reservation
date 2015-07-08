#!/bin/bash

node setup_db.js

ln -s vmtool /etc/init.d/vmtool
cd /etc/init.d/
chmod 777 vmtool

service vmtool start
