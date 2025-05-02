#!/bin/bash
echo "Waiting for MongoDB to be ready..."
until mongosh --username admin --password adminpassword --authenticationDatabase admin --eval "db.adminCommand('ping')"; do
  sleep 2
done

echo "Restoring dump..."
mongorestore --username admin --password adminpassword --authenticationDatabase admin /dump
