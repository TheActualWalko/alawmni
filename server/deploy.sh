#!/bin/bash
./deploy-server.sh && cd ../public && ./deploy.sh && cd ../server && ./remote-restart-server.sh