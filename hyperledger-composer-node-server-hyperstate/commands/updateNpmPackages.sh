#!/bin/bash

docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

# sudo apt-get update
# sudo apt-get upgrade
# sudo apt-get autoremove

#hyperstate folder

cd ..
sudo rm -rf node_modules/
sudo rm -rf package-lock.json

sudo npm rebuild --unsafe-perm

sudo npm uninstall -g composer-cli --unsafe-perm
sudo npm uninstall -g composer-rest-server --unsafe-perm
sudo npm uninstall -g generator-hyperledger-composer --unsafe-perm

#Update composer client
sudo npm install -g composer-cli@0.20.4 --unsafe-perm
#Update composer rest server
sudo npm install -g composer-rest-server@0.20.4 --unsafe-perm
#Update generator
#sudo npm install -g generator-hyperledger-composer0.20 --unsafe-perm
#Update YO project generator
sudo npm install -g yo --unsafe-perm
#Update Composer Playground
#sudo npm install -g composer-playground --unsafe-perm

