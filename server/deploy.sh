#!/bin/bash
./deploy-server.sh && cd public && ./deploy.sh && cd .. && ./remote-restart-server.sh