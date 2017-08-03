#!/bin/bash
./build.sh && node_modules/.bin/forever -o out.log -e err.log restart dist/main.js
