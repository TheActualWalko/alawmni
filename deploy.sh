#!/bin/bash
cd server && ./deploy.sh && cd ../public && ./deploy.sh && ssh root@alumnidb.io 'cd /var/www/server/ && npm i && cd ../public && npm i && ./build.sh && cd ../server && ./build.sh && ./run.sh'