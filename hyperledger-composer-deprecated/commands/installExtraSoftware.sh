#!/bin/bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
sudo apt-get install build-essential
sudo npm install -g ionic cordova
sudo npm install -g superagent
sudo npm install winston
cd .. 
sudo npm install express --unsafe-perm
cd commands/