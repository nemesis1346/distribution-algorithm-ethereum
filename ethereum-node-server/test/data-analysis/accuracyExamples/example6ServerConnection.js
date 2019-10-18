require("regenerator-runtime/runtime");

//Truffle Configuration
const truffleConfiguration = require('../../../truffle.js');
const PORT = truffleConfiguration.networks.development.port;
const HOST = truffleConfiguration.networks.development.host;

const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://' + HOST + ':' + PORT));
const gasLimit = '6721975';
const connection = require('../../requestConnectionServer.js');

async function example6() {
    try {
        const accounts = await web3Provider.eth.accounts;
       
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

        await connection.createTrack(
            trackId,
            traderIsrc,
            'track',
            100,
            trader1,
            gasLimit);

        //ContractAddresses
        let TAContractAddressData = await connection.getTAContractAddress();
        let TAContractAddress = (JSON.parse(TAContractAddressData.body).data.data).replace(/\"/g, "");
        let traderContractAddressData = await connection.getTraderContractAddress();
        let traderContractAddress = (JSON.parse(traderContractAddressData.body).data.data).replace(/\"/g, "");
        let trackContractAddressData = await connection.getTrackContractAddress();
        let trackContractAddress = (JSON.parse(trackContractAddressData.body).data.data).replace(/\"/g, "");

        //  Creating Traders
        await connection.createTrader(
            trader1,
            "trader1",
            trader1,
            TAContractAddress,
            trader1,
            gasLimit);

        await connection.createTrader(
            trader2,
            "trader2",
            trader2,
            TAContractAddress,
            trader2,
            gasLimit);

        await connection.createTrader(
            trader3,
            "trader3",
            trader3,
            TAContractAddress,
            trader3,
            gasLimit);


        await connection.createTrader(
            trader4,
            "trader4",
            trader4,
            TAContractAddress,
            trader4,
            gasLimit);


        // //Agreement 1
        await connection.createAgreement(
            agreement1Id,
            trader1,
            trader2,
            30,
            trackId,
            traderContractAddress, //TODO: fix this
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 2
        await connection.createAgreement(
            agreement2Id,
            trader1,
            trader3,
            50,
            trackId,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 3
        await connection.createAgreement(
            agreement3Id,
            trader3,
            trader4,
            90,
            trackId,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );
        //Starts distribution
        await connection.distribution(
            trackId,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit);

        //Results after
        console.log('TRADERS OUTPUT----------------------');
        console.log(trader1);
        //Trader1
        let trader1Result = await connection.getTraderDetail(
            trader1,
            trader1,
            gasLimit);

        let trader1Model = JSON.parse(JSON.parse(trader1Result.body).data.data);

        let tokenTrader1Result = await connection.getTokenAccount(
            trader1,
            trader1,
            gasLimit
        );

        let tokenTrader1Model = JSON.parse(JSON.parse(tokenTrader1Result.body).data.data);

        console.log('TRADER ' + trader1Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader1Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader1Model.balanceEnabled);

        //Trader2
        let trader2Result = await connection.getTraderDetail(
            trader2,
            trader2,
            gasLimit);

        let trader2Model = JSON.parse(JSON.parse(trader2Result.body).data.data);

        let tokenTrader2Result = await connection.getTokenAccount(
            trader2,
            trader2,
            gasLimit
        );

        let tokenTrader2Model = JSON.parse(JSON.parse(tokenTrader2Result.body).data.data);

        console.log('TRADER ' + trader2Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader2Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader2Model.balanceEnabled);

        //Trader 3
        let trader3Result = await connection.getTraderDetail(
            trader3,
            trader3,
            gasLimit);

        let trader3Model = JSON.parse(JSON.parse(trader3Result.body).data.data);

        let tokenTrader3Result = await connection.getTokenAccount(
            trader3,
            trader3,
            gasLimit
        );

        let tokenTrader3Model = JSON.parse(JSON.parse(tokenTrader3Result.body).data.data);

        console.log('TRADER ' + trader3Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader3Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader3Model.balanceEnabled);

        //Trader4
        let trader4Result = await connection.getTraderDetail(
            trader4,
            trader4,
            gasLimit);

        let trader4Model = JSON.parse(JSON.parse(trader4Result.body).data.data);

        let tokenTrader4Result = await connection.getTokenAccount(
            trader4,
            trader4,
            gasLimit
        );

        let tokenTrader4Model = JSON.parse(JSON.parse(tokenTrader4Result.body).data.data);

        console.log('TRADER ' + trader4Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader4Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader4Model.balanceEnabled);
        return;
    } catch (error) {
        console.log(error)
    }
}

example6();
