#!/bin/bash

# The source command can be used to load any functions file into the current shell script or a command prompt.
# Gets hyperstate version and latest bna file
source ./getLatestBnaAndVer.sh

echo "Using bna file: $hyperstateNewBNA"
echo "Using version number: $hyperstateNewVer"
#May have to take down the existing business network 
#before upgrading can commence, not sure.

# Testing dynamically updating package.json file
# http://linuxsay.com/t/how-to-update-an-value-in-json-file-dynamically/3114/2
TAB=$'\t'
sed -i '' -e "s/.*version.*/${TAB}\"version\": \"$hyperstateNewVer\",/g" ../package.json

#To recreate the bna file
echo "composer archive create --sourceType dir --sourceName ../ -a $hyperstateNewBNA"

composer archive create --sourceType dir --sourceName ../ -a $hyperstateNewBNA

echo "composer network upgrade --card Peeradmin@hlfv1 -n hyperstate -V  $hyperstateNewVer" 

# Upgrade the network
composer network upgrade --card Peeradmin@hlfv1 -n hyperstate -V  $hyperstateNewVer

echo "composer network ping -c admin@hyperstate" 
#To verfy that we have connection
composer network ping -c admin@hyperstate