#!/bin/bash

npm install

export SERVERPATH=$(pwd)
sed "s=SERVERPLACEHOLDER=$SERVERPATH=g" vmtool-ui.tmp > vmtool-ui

cp vmtool-ui /etc/init.d/vmtool-ui
chmod 777 /etc/init.d/vmtool-ui

service vmtool-ui start
