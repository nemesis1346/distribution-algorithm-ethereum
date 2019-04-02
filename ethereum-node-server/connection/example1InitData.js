const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const trackEndpoint = require('./trackEndpoint.js');
const traderEndpoint = require('./traderEndpoint.js');
const tokenAccountEndpoint = require('./tokenAccountEndpoint.js');
async function example1() {
    try {
        const accounts = await web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        console.log(accounts)

        //Delegating accounts addresses/ids
        let trackId = accounts[1];
        let trader1 = accounts[2]; //Artist
        let trader2 = accounts[3];
        let trader3 = accounts[4]; //this is the design, the accounts of balances are separated from the traders
        let trader4 = accounts[5];
        let agreement1Id = accounts[6];
        let agreement2Id = accounts[7];
        let agreement3Id = accounts[8];

        //Creating and testing tracks
        let traderIsrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        await trackEndpoint.createTrack(
            trackId,
            traderIsrc,
            'track',
            100,
            trader1,
            '6721975');

        let trackResult = await trackEndpoint.getTrack(
            trackId,
            trader1,
            '6721975');

        console.log('TRACK CREATION');
        console.log(trackResult);


        //Creating Traders
        await traderEndpoint.createTrader(
            trader1,
            "trader1",
            trader1,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader1,
            '6721975');

        let trader1Result = await traderEndpoint.getTrader(
            trader1,
            trader1,
            '6721975');

        console.log('TRADER TRADER 1 CREATION');
        console.log(trader1Result);

        await traderEndpoint.createTrader(
            trader2,
            "trader2",
            trader2,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader2,
            '6721975');

        let trader2Result = await traderEndpoint.getTrader(
            trader2,
            trader2,
            '6721975');

        console.log('TRADER TRADER 2 CREATION');
        console.log(trader2Result);

        await traderEndpoint.createTrader(
            trader3,
            "trader3",
            trader3,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader3,
            '6721975');

        let trader3Result = await traderEndpoint.getTrader(
            trader3,
            trader3,
            '6721975');

        console.log('TRADER TRADER 3 CREATION');
        console.log(trader3Result);

        await traderEndpoint.createTrader(
            trader4,
            "trader4",
            trader4,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader4,
            '6721975');

        let trader4Result = await traderEndpoint.getTrader(
            trader4,
            trader4,
            '6721975');

        console.log('TRADER TRADER 4 CREATION');
        console.log(trader4Result);

    } catch (error) {
        console.log(error)
    }
}

example1();
