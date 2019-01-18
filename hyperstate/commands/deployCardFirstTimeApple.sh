#!/bin/bash

#With this following command we create the bna file
composer archive create -t dir -n ../

# The source command can be used to load any functions file into the current shell script or a command prompt.
# Gets hyperstate version and latest bna file
source ./getLatestBnaAndVer.sh

echo "Using hyperstate version: $hyperstateVer "
echo "Using hyperstate bna file: $hyperstateBNA "

#With the following install the HC runtime with the specific name of the application
composer network install --card PeerAdmin@hlfv1 --archiveFile $hyperstateBNA

# Check what the command is outputting
echo "composer network install --card PeerAdmin@hlfv1 --archiveFile $hyperstateBNA"

#We deploy the business network with an administrator, the association with the bna card and the output name of the file of that card
composer network start --networkName hyperstate --networkVersion $hyperstateVer --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file hyperstate.card

# Check what the command is outputting, are the variables outputted correctly
echo "composer network start --networkName hyperstate --networkVersion $hyperstateVer admin --networkAdmin admin --  networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file hyperstate.card"

#To import the card
composer card import --file hyperstate.card
#We test that we can communicate with the fabric
composer network ping --card admin@hyperstate

