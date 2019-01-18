#!/bin/bash

docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

npm rebuild --unsafe-perm

npm uninstall -g composer-cli --unsafe-perm
npm uninstall -g composer-rest-server --unsafe-perm
npm uninstall -g generator-hyperledger-composer --unsafe-perm

#Update composer client
npm install -g composer-cli --unsafe-perm
#Update composer rest server
npm install -g composer-rest-server --unsafe-perm
#Update generator
npm install -g generator-hyperledger-composer --unsafe-perm
#Update YO project generator
npm install -g yo --unsafe-perm
#Update Composer Playground
npm install -g composer-playground --unsafe-perm
