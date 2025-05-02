#!/bin/bash
echo "Waiting for MongoDB..."
until mongosh --host mongodb --username admin --password adminpass --authenticationDatabase admin --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
  sleep 2
done

echo "Restoring dump..."
mongorestore --host mongodb --port 27017 \
  --username admin --password adminpass --authenticationDatabase admin /dump
