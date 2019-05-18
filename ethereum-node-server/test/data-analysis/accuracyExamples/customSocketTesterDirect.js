const Web3 = require('web3');
//const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const trackEndpoint = require('../../../connection/trackEndpoint.js');
const traderEndpoint = require('../../../connection/traderEndpoint.js');
const tokenAccountEndpoint = require('../../../connection/tokenAccountEndpoint.js');
const agreementEndpoint = require('../../../connection/agreementEndpoint.js');
const distributionEndpoint = require('../../../connection/distributionEndPoint');
const gasLimit = '6721975';
let counter = 0;
const CreateTrackRequest = require('../../../models/createTrackRequest.js');

async function example1() {
    console.log('GETS HERE');
    try {
        const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        const accounts = await web3Provider.eth.accounts;

        //Delegating accounts addresses/ids
        let trackId1 = accounts[1];
        let trader1 = accounts[2]; //Artist
        let track1Isrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        let createTrackRequest = new CreateTrackRequest(
            trackId1,
            track1Isrc,
            'track1',
            10,
            trader1,
            gasLimit
        );
        await trackEndpoint.createTrack(
            createTrackRequest,
            );

    
        counter++;
    } catch (error) {
        console.log(error)
    }
}

example1();
example1();
example1();
console.log(counter);