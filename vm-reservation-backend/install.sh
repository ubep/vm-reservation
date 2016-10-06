#!/bin/bash

mkdir backup

npm install

node setup_db.js

export SERVERPATH=$(pwd)
sed "s=SERVERPLACEHOLDER=$SERVERPATH=g" vmtool.tmp > vmtool
sed "s=SERVERPLACEHOLDER=$SERVERPATH=g" backup.tmp > backup.sh

mv vmtool /etc/init.d/vmtool
chmod 777 /etc/init.d/vmtool

service vmtool start
