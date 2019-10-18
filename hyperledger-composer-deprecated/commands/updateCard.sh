#!/bin/bash

# The source command can be used to load any functions file into the current shell script or a command prompt.
# Returns hyperstateVer and hyperstateBNA
source ./getLatestBnaAndVer.sh

echo "Using version number: $hyperstateNewVer"
echo "Using bna file: $hyperstateNewBNA"

# Testing dynamically updating package.json file, think it works.
# http://linuxsay.com/t/how-to-update-an-value-in-json-file-dynamically/3114/2
TAB=$'\t'
sed -i '' -e "s/.*version.*/${TAB}\"version\": \"$hyperstateNewVer\",/g" ../package.json

#To recreate the bna file
sudo composer archive create --sourceType dir --sourceName ../ -a $hyperstateNewBNA
#To update the card
sudo composer network install --card PeerAdmin@hlfv1 --archiveFile $hyperstateNewBNA

sudo composer network upgrade -c PeerAdmin@hlfv1 -n hyperstate -V $hyperstateNewVer 

#To verfy that we have connection
sudo composer network ping -c admin@hyperstate | grep Business

sudo node ../middleware/gate.js

