#!/bin/bash

cd ..
sudo truffle compile
sudo truffle migrate --reset
cd middleware 
#sudo node server.js
sudo node socketErrorServer.js