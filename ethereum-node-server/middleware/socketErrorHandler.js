const contractTruffle = require('truffle-contract');
const ganache =require('ganache-core');
const DataModel = require("../models/dataModel");
const Web3 = require('web3');
const web3Provider = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('http://localhost:7545'));

const trackEndpoint = require('../connection/trackEndpoint.js');
const tracks_artifact = require('../build/contracts/Tracks.json');
//Contract
const TracksContract = contractTruffle(tracks_artifact);
//Setting Providers
TracksContract.setProvider(web3Provider.currentProvider);
const CreateTrackRequest = require('../models/createTrackRequest.js');
const gasLimit = '6721975'; //this must come from the front end

async function stop() {
    console.log('Shutting down...');

    if (process.env.DEBUG) console.log(process._getActiveHandles());

    process.exit(0);
}
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM')
    await stop();
})

process.on('SIGINT', async () => {
    console.log('Received SIGINT')
    await stop();
})
process.on('message', async function (input) {
    //Call method
    //TODO: must change the way the methods are called
    let result;
    let dataModel = new DataModel(null, null, null);
    let createTrackRequest;
    try {
        let url = input.url;
        switch (url) {
            case '/socketError':
                console.log('SUCCESSFUL CONNECTIONS');
                const accounts = await web3Provider.eth.accounts;
                console.log('NETWORK ACCOUNTS');
                console.log(accounts)
                let trackId1 = accounts[1];
                let track1Isrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS
                let trader1 = accounts[2]; //Artist
                createTrackRequest = new CreateTrackRequest(
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
                process.exit(0);
                break;
            default:
                dataModel.message = "Method not found";
                dataModel.status = "405";
                let body = JSON.stringify(dataModel);
                console.log("STATUS 405: ");
                console.log("Method not found");
                process.send(body);
                process.exit(0);
                break;
        }

        //Executing the promise , maybe need POST and GET
        if (result != null) {
            //console.log(result);
            //This is status 200 , everything ok
            if (result) {
                if (result.status == "200") {
                    dataModel.data = result;
                    dataModel.status = "200";
                } else {
                    // console.log(dataModel);
                    dataModel.message = result;
                    dataModel.status = "300";
                }
            } else {
                console.log("Something went wrong");
                console.log(result);
            }
            let body = JSON.stringify(dataModel);
            console.log("STATUS 200: ");
            console.log(body);
            process.send(body);
        }
        //STILL NOT WORKING 
        process.exit(0);

    } catch (error) {
        console.log("ERROR IN HANDLER PROCESS");
        dataModel.message = error.message.toString();
        dataModel.status = "400";
        let body = JSON.stringify(dataModel);
        console.log("ERROR 400:");
        console.log(dataModel);
        process.send(body);
        process.exit(0);
    }
});

