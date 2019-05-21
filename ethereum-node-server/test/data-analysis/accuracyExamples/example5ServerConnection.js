require("regenerator-runtime/runtime");

//Truffle Configuration
const truffleConfiguration = require('../../../truffle.js');
const PORT = truffleConfiguration.networks.development.port;
const HOST = truffleConfiguration.networks.development.host;

const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://' + HOST + ':' + PORT));
const gasLimit = '6721975';
const connection = require('../../requestConnectionServer.js');

async function example5() {
    try {
        const accounts = await web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        //console.log(accounts)

        //Delegating accounts addresses/ids
        let trackId1 = accounts[1];
        let trackId2 = accounts[2];
        let trader1 = accounts[3]; //Artist
        let trader2 = accounts[4];
        let trader3 = accounts[5]; //this is the design, the accounts of balances are separated from the traders
        let trader4 = accounts[6];
        //Delegating agreements addresses
        //track1
        let agreement1Id = accounts[7];
        let agreement2Id = accounts[8];
        let agreement3Id = accounts[9];
        //track2
        let agreement4Id = accounts[10];
        let agreement5Id = accounts[11];
        let agreement6Id = accounts[12];

        //Creating and testing tracks
        let track1Isrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        await connection.createTrack(
            trackId1,
            track1Isrc,
            'track1',
            100,
            trader2,
            gasLimit);

        let track2Isrc = new Date().getUTCMilliseconds();
        
        await connection.createTrack(
            trackId2,
            track2Isrc,
            'track2',
            100,
            trader1,
            gasLimit
        );

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
            trader2,
            trader3,
            80,
            trackId1,
            traderContractAddress, //TODO: fix this
            trackContractAddress,
            trader2,
            gasLimit
        );

        //Agreement 2
        await connection.createAgreement(
            agreement2Id,
            trader3,
            trader4,
            75,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader2,
            gasLimit
        );

        //Agreement 3
        await connection.createAgreement(
            agreement3Id,
            trader1,
            trader2,
            90,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader2,
            gasLimit
        );

        //Agreement 4
        await connection.createAgreement(
            agreement4Id,
            trader2,
            trader3,
            80,
            trackId2,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );    

        //Agreement 5
        await connection.createAgreement(
            agreement5Id,
            trader3,
            trader4,
            75,
            trackId2,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );
        //Agreement 6
        await connection.createAgreement(
            agreement6Id,
            trader1,
            trader2,
            90,
            trackId2,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //We update the track revenue first
        await connection.updateTrackRevenue(
            trackId1,
            100,
            trader1, //doesnt matter
            gasLimit
        );
            
        //Starts distribution
        await connection.distribution(
            trackId1,
            trader2,
            new Date().getTime(),
            trader2,
            gasLimit);

        await connection.updateTrackRevenue(
            trackId1,
            200,
            trader1,
            gasLimit
        );

        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader2,
            gasLimit
        );
        await connection.updateTrackRevenue(
            trackId2,
            500,
            trader2,
            gasLimit
        );
         
        await connection.distribution(
            trackId2,
            trader2,
            new Date().getTime(),
            trader2,
            gasLimit
        );
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
    } catch (error) {
        console.log(error)
    }
}

example5();
