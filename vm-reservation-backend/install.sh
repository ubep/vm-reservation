#!/bin/bash
npm install

# Create DB (no-op if file exists)
node setup_db.js

# Run migrations
node_modules/db-migrate/bin/db-migrate up -e default

# Install init script
export SERVERPATH=$(pwd)
sed "s=SERVERPLACEHOLDER=$SERVERPATH=g" vmtool.tmp > vmtool

mv vmtool /etc/init.d/vmtool
chmod 777 /etc/init.d/vmtool

# Start service
service vmtool start
