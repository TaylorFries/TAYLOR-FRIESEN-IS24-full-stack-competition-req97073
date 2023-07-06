#!/bin/bash

python rangen.py

# Start the first process
cd site_frontend
npm start &
cd ..
# Start the second process
cd site_backend
npm start &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?