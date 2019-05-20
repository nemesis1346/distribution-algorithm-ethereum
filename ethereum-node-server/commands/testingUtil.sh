#!/bin/bash

cd ..
sudo truffle compile
sudo truffle migrate --reset
cd test/data-analysis/accuracyExamples

sudo node example1DirectConnection.js
