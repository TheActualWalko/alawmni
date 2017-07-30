#!/bin/bash
./build.sh && node_modules/.bin/forever restart dist/main.js
