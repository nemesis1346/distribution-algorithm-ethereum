#!/bin/bash

docker stop $(docker ps -q)
docker start $(docker ps -aq)

cd ../middleware

sudo node gate.js

