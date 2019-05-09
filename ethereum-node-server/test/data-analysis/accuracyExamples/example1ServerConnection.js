const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const gasLimit = '6721975';
const methods = require('../../requestConnectionServer.js');

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

        await methods.createTrack(
            trackId,
            traderIsrc,
            'track',
            100,
            trader1,
            gasLimit);

        //Creating Traders
        await methods.createTrader(
            trader1,
            "trader1",
            trader1,
            await methods.getTAContractAddress(),
            trader1,
            gasLimit);

        await methods.createTrader(
            trader2,
            "trader2",
            trader2,
            await methods.getTAContractAddress(),
            trader2,
            gasLimit);

        await methods.createTrader(
            trader3,
            "trader3",
            trader3,
            await methods.getTAContractAddress(),
            trader3,
            gasLimit);


        await methods.createTrader(
            trader4,
            "trader4",
            trader4,
            await methods.getTAContractAddress(),
            trader4,
            gasLimit);

        //Agreement 1
        await methods.createAgreement(
            agreement1Id,
            trader1,
            trader2,
            30,
            trackId,
            await methods.getTraderContractAddress(), //TODO: fix this
            await methods.getTrackContractAddress(),
            trader1,
            gasLimit
        );

        //Agreement 2
        await methods.createAgreement(
            agreement2Id,
            trader1,
            trader3,
            50,
            trackId,
            await methods.getTraderContractAddress(),
            await methods.getTrackContractAddress(),
            trader1,
            gasLimit
        );

        //Agreement 3
        await methods.createAgreement(
            agreement3Id,
            trader3,
            trader4,
            90,
            trackId,
            await methods.getTraderContractAddress(),
            await methods.getTrackContractAddress(),
            trader1,
            gasLimit
        );

        await methods.distribution(
            trackId,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit);

        //Results after
        console.log('TRADERS OUTPUT----------------------');
            console.log(trader1);
        //Trader1
        let trader1Result = await methods.getTrader(
            trader1,
            trader1,
            gasLimit);

        let tokenTrader1Result = await methods.getTokenAccount(
            trader1,
            trader1,
            gasLimit
        );

        console.log('TRADER ' + trader1Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader1Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader1Result.balanceEnabled);

        //Trader2
        let trader2Result = await methods.getTrader(
            trader2,
            trader2,
            gasLimit);

        let tokenTrader2Result = await methods.getTrader(
            trader2,
            trader2,
            gasLimit
        );

        console.log('TRADER ' + trader2Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader2Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader2Result.balanceEnabled);

        //Trader 3
        let trader3Result = await methods.getTrader(
            trader3,
            trader3,
            gasLimit);

        let tokenTrader3Result = await methods.getTrader(
            trader3,
            trader3,
            gasLimit
        );
        console.log('TRADER ' + trader3Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader3Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader3Result.balanceEnabled);

        //Trader4
        let trader4Result = await methods.getTrader(
            trader4,
            trader4,
            gasLimit);

        let tokenTrader4Result = await methods.getTrader(
            trader4,
            trader4,
            gasLimit
        );

        console.log('TRADER ' + trader4Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader4Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader4Result.balanceEnabled);
    } catch (error) {
        console.log(error)
    }
}

example1();
