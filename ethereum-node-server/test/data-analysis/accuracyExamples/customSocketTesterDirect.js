const Web3 = require('web3');
const trackEndpoint = require('../../../connection/trackEndpoint.js');
const gasLimit = '6721975';
let counter = 0;
const CreateTrackRequest = require('../../../models/createTrackRequest.js');
const HDWalletProvider = require('truffle-hdwallet-provider');
const ganacheCli = require('ganache-cli');
const Utils = require('../../../resources/Utils.js');

async function example1() {
    try {
        const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        const accounts = await web3Provider.eth.accounts;

        //Delegating accounts addresses/ids
      //  let trackId1 = accounts[1];
       // let trader1 = accounts[2]; //Artist
        let trackId1=new HDWalletProvider(Utils.makeid(10),'http://localhost:8545');  
        let trader1=new HDWalletProvider(Utils.makeid(10),'http://localhost:8545');  
        
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


