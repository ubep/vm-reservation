#!/bin/bash

node setup_db.js

export SERVERPATH=$(pwd)'/index.js'
sed "s=SERVERPLACEHOLDER=$SERVERPATH=g" vmtool.tmp > vmtool

cp vmtool /etc/init.d/vmtool
cd /etc/init.d/
chmod 777 vmtool

service vmtool start
