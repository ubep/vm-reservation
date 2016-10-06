#!/bin/bash
npm install

node setup_db.js

export SERVERPATH=$(pwd)
sed "s=SERVERPLACEHOLDER=$SERVERPATH=g" vmtool.tmp > vmtool

mv vmtool /etc/init.d/vmtool
chmod 777 /etc/init.d/vmtool

service vmtool start
