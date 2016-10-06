#!/bin/bash

npm install
node_modules/bower/bin/bower install

export SERVERPATH=$(pwd)
sed "s=SERVERPLACEHOLDER=$SERVERPATH=g" vmtool-ui.tmp > vmtool-ui

mv vmtool-ui /etc/init.d/vmtool-ui
chmod 777 /etc/init.d/vmtool-ui

service vmtool-ui start
