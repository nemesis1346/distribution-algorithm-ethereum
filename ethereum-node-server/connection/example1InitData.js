const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const trackEndpoint = require('./trackEndpoint.js');

async function example1() {
    try {
        const accounts = await web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        console.log(accounts)

        //Delegating accounts addresses/ids
        let trackId = accounts[1];
        let traderEmitterAddress = accounts[2]; //Artist
        let traderReceiverAddress = accounts[3];
        let agreementAddress = accounts[4]; //this is the design, the accounts of balances are separated from the traders
        let agreementAddress2 = accounts[5];

        //Creating and testing tracks
        let traderIsrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        await trackEndpoint.createTrack(
            trackId,
            traderIsrc,
            'track',
            100,
            traderEmitterAddress,
            '6721975');

        let trackResult = await trackEndpoint.getTrack(
            trackId,
            traderEmitterAddress,
            '6721975');

        console.log('TRACK CREATION');
        console.log(trackResult);

    } catch (error) {
        console.log(error)
    }
}

example1();
