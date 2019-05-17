'use strict';
const port = 3123;
//This is very necessary to the data analysis. Must be replicated in both platforms
//Imports
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

//const { exec, spawn, fork, execFile } = require('promisify-child-process')
const { fork } = require('child_process');

const app = express();

const contractTruffle = require('truffle-contract');
//const ganache =require('ganache-core');
const DataModel = require("../models/dataModel");
const Web3 = require('web3');
//const web3Provider = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('http://localhost:7545'));
//const web3Provider = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
//const web3Provider = new Web3('ws://localhost:7545');
//const web3Provider = new Web3(new Web3.providers.HttpProvider('https://ropstein.infura.io/2d93c5115ef6481693ef04e42f6bcba8'));
//const web3Provider = new Web3(Web3.givenProvider ||'http://localhost:7545');

const trackEndpoint = require('../connection/trackEndpoint.js');
const TrackModel = require('../models/trackModel');
const tracks_artifact = require('../build/contracts/Tracks.json');
//Contract
const TracksContract = contractTruffle(tracks_artifact);
//Setting Providers
const CreateTrackRequest = require('../models/createTrackRequest.js');
const gasLimit = '6721975'; //this must come from the front end
const connection = require('../test/requestConnectionServer.js');

const handler = async (request, response) => {
    const { headers, method, url } = request;
    let buffer = [];
    request.on('error', (err) => {
        console.log("Error", err);
    }).on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', async () => {
        let bufferContent = Buffer.concat(buffer).toString();

        //Set response
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        response.on('error', (err) => {
            console.error(err);
        });
        //Call method
        let promise;
        let dataModel = new DataModel(null, null, null);
        try {
            switch (url) {
                    case '/socketError':
                    let web3Provider = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('http://localhost:7545'));
                    TracksContract.setProvider(web3Provider.currentProvider);

                    console.log('SUCCESSFUL CONNECTIONS');
                    const accounts = await web3Provider.eth.accounts;
                    console.log('NETWORK ACCOUNTS');
                    console.log(accounts)
                    let trackId1 = accounts[1];
                    let track1Isrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS
                    let trader1 = accounts[2]; //Artist
                    let createTrackRequest = new CreateTrackRequest(
                        trackId1,
                        track1Isrc,
                        'track1',
                        10,
                        trader1,
                        gasLimit
                    );
                    await trackEndpoint.createTrack(
                        createTrackRequest);
                    
                    //web3Provider.
                    //web3Provider.providers.WebsocketProvider.discon
                  //  process.exit(0);
                  dataModel.data = JSON.stringify(createTrackRequest);
                dataModel.status = '200';
                    break;
                default:
                    dataModel.message = 'Method not found';
                    dataModel.status = '405';
                    let body = JSON.stringify(dataModel);

                    console.log('STATUS 405: ');
                    console.log('Method not found');
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 405;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                    break;
            }

            //Executing the promise , maybe need POST and GET
            if (promise != null) {
                promise.then(function (result) {
                    console.log(result);
                    //This is status 200 , everything ok
                    if (result) {
                        if (result.status == '200') {
                            dataModel.data = result;
                            dataModel.status = '200';
                        } else {
                            console.log(dataModel)
                            dataModel.message = result;
                            dataModel.status = '300';
                        }
                    } else {
                        console.log('Something went wrong');
                        console.log(result);
                    }
                    let body = JSON.stringify(dataModel);
                    console.log('STATUS 200: ');
                    console.log(body);
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 200;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                }).catch((error) => {
                    console.log('ERROR IN GATE');

                    dataModel.message = error.message.toString();
                    dataModel.status = '400';
                    let body = JSON.stringify(dataModel);
                    console.log('ERROR 400:');
                    console.log(dataModel);
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 300;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                    
                });
            }
          //  process.exit(0);

        } catch (error) {
            dataModel.message = error.message.toString();
            dataModel.status = '500';
            let body = JSON.stringify(dataModel);
            console.log('ERROR 500:');
            console.log(error);
            const responseBody = { headers, method, url, body };

            response.statusCode = 500;
            response.write(JSON.stringify(responseBody));
            response.end();
        //    process.exit(0);

        }
    });
}


app.post('/socketError',handler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is listening on: ', port);
});
