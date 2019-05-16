'use strict';
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const trackEndpoint = require('../connection/trackEndpoint.js');
const traderEndpoint = require('../connection/traderEndpoint.js');
const tokenAccountEndpoint = require('../connection/tokenAccountEndpoint.js');
const agreementEndpoint = require('../connection/agreementEndpoint.js');
const distributionEndpoint = require('../connection/distributionEndPoint');
const gasLimit = '6721975'; //this must come from the front end

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
            gasLimit);

        //Creating Traders
        await traderEndpoint.createTrader(
            trader1,
            "trader1",
            trader1,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader1,
            gasLimit);

        await traderEndpoint.createTrader(
            trader2,
            "trader2",
            trader2,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader2,
            gasLimit);

        await traderEndpoint.createTrader(
            trader3,
            "trader3",
            trader3,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader3,
            gasLimit);


        await traderEndpoint.createTrader(
            trader4,
            "trader4",
            trader4,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader4,
            gasLimit);

        //Agreement 1
        await agreementEndpoint.createAgreement(
            agreement1Id,
            trader1,
            trader2,
            30,
            trackId,
            await traderEndpoint.getTraderContractAddress(),
            await trackEndpoint.getTrackContractAddress(),
            trader1,
            gasLimit
        );

        //Agreement 2
        await agreementEndpoint.createAgreement(
            agreement2Id,
            trader1,
            trader3,
            50,
            trackId,
            await traderEndpoint.getTraderContractAddress(),
            await trackEndpoint.getTrackContractAddress(),
            trader1,
            gasLimit
        );

        //Agreement 3
        await agreementEndpoint.createAgreement(
            agreement3Id,
            trader3,
            trader4,
            90,
            trackId,
            await traderEndpoint.getTraderContractAddress(),
            await trackEndpoint.getTrackContractAddress(),
            trader1,
            gasLimit
        );

        await distributionEndpoint.distribution(
            trackId,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit);

        //Results after
        console.log('TRADERS OUTPUT----------------------');
            console.log(trader1);
        //Trader1
        let trader1Result = await traderEndpoint.getTrader(
            trader1,
            trader1,
            gasLimit);

        let tokenTrader1Result = await tokenAccountEndpoint.getTokenAccount(
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
        let trader2Result = await traderEndpoint.getTrader(
            trader2,
            trader2,
            gasLimit);

        let tokenTrader2Result = await traderEndpoint.getTrader(
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
        let trader3Result = await traderEndpoint.getTrader(
            trader3,
            trader3,
            gasLimit);

        let tokenTrader3Result = await traderEndpoint.getTrader(
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
        let trader4Result = await traderEndpoint.getTrader(
            trader4,
            trader4,
            gasLimit);

        let tokenTrader4Result = await traderEndpoint.getTrader(
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
        console.log('ERROR IN EXAMPLE 1 IN TESTING ENDPOINT');
        throw new Error(error);
    }
}
module.exports.example1 = example1;

async function example2(){
    try{
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
    }catch(error){
        console.log('ERROR IN EXAMPLE 2 IN TESTING ENDPOINT');
        throw new Error(error);
    }
}
module.exports.example2 = example2;

async function example3_scenario3(){
    try{
 const accounts = await web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        //console.log(accounts)

        //Delegating accounts addresses/ids
        let trackId1 = accounts[1];
        let trader1 = accounts[2]; //Artist
        let trader2 = accounts[3];
        let trader3 = accounts[4]; //this is the design, the accounts of balances are separated from the traders
        let trader4 = accounts[5];
        //Delegating agreements addresses
        //track1
        let agreement1Id = accounts[6];
        let agreement2Id = accounts[7];
        let agreement3Id = accounts[8];
        let agreement4Id = accounts[9];

        //ContractAddresses
        let TAContractAddressData = await connection.getTAContractAddress();
        let TAContractAddress = (JSON.parse(TAContractAddressData.body).data.data).replace(/\"/g, "");

        let traderContractAddressData = await connection.getTraderContractAddress();
        let traderContractAddress = (JSON.parse(traderContractAddressData.body).data.data).replace(/\"/g, "");

        let trackContractAddressData = await connection.getTrackContractAddress();
        let trackContractAddress = (JSON.parse(trackContractAddressData.body).data.data).replace(/\"/g, "");

        //Creating and testing tracks
        let track1Isrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        await connection.createTrack(
            trackId1,
            track1Isrc,
            'track1',
            10,
            trader1,
            gasLimit);

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
            50,
            trackId1,
            traderContractAddress, //TODO: fix this
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 2
        await connection.createAgreement(
            agreement2Id,
            trader2,
            trader3,
            50,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 3
        await connection.createAgreement(
            agreement3Id,
            trader3,
            trader1,
            25,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 4
        await connection.createAgreement(
            agreement4Id,
            trader3,
            trader4,
            25,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Starts distribution
        await connection.distribution(
            trackId1,
            trader2,
            new Date().getTime(),
            trader2,
            gasLimit);
        await connection.distribution(
            trackId1,
            trader2,
            new Date().getTime(),
            trader2,
            gasLimit
        );
        await connection.distribution(
            trackId1,
            trader2,
            new Date().getTime(),
            trader2,
            gasLimit
        );
        await connection.distribution(
            trackId1,
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
    }catch(error){
        console.log('ERROR IN EXAMPLE 3 IN TESTING ENDPOINT');
        throw new Error(error);
    }
}
module.exports.example3_scenario3 = example3_scenario3;


async function example4_scenario1(){
    try{
 const accounts = await web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        //console.log(accounts)

        //Delegating accounts addresses/ids
        let trackId1 = accounts[1];
        let trader1 = accounts[2]; //Artist
        let trader2 = accounts[3];
        let trader3 = accounts[4]; //this is the design, the accounts of balances are separated from the traders
        let trader4 = accounts[5];
        let trader5 = accounts[6];
        //Delegating agreements addresses
        //track1
        let agreement1Id = accounts[7];
        let agreement2Id = accounts[8];
        let agreement3Id = accounts[9];
        let agreement4Id = accounts[10];
        let agreement5Id = accounts[11];

        //ContractAddresses
        let TAContractAddressData = await connection.getTAContractAddress();
        let TAContractAddress = (JSON.parse(TAContractAddressData.body).data.data).replace(/\"/g, "");

        let traderContractAddressData = await connection.getTraderContractAddress();
        let traderContractAddress = (JSON.parse(traderContractAddressData.body).data.data).replace(/\"/g, "");

        let trackContractAddressData = await connection.getTrackContractAddress();
        let trackContractAddress = (JSON.parse(trackContractAddressData.body).data.data).replace(/\"/g, "");

        //Creating and testing tracks
        let track1Isrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        await connection.createTrack(
            trackId1,
            track1Isrc,
            'track1',
            10,
            trader1,
            gasLimit);

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

        await connection.createTrader(
            trader5,
            "trader5",
            trader5,
            TAContractAddress,
            trader5,
            gasLimit);

        // //Agreement 1
        await connection.createAgreement(
            agreement1Id,
            trader1,
            trader2,
            25,
            trackId1,
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
            25,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 3
        await connection.createAgreement(
            agreement3Id,
            trader2,
            trader4,
            50,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 4
        await connection.createAgreement(
            agreement4Id,
            trader3,
            trader4,
            50,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        await connection.createAgreement(
            agreement5Id,
            trader4,
            trader5,
            50,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Starts distribution
        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit);

        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit
        );
        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit
        );
        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader1,
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

        //trader 5
         //Trader4
         let trader5Result = await connection.getTraderDetail(
            trader5,
            trader5,
            gasLimit);

        let trader5Model = JSON.parse(JSON.parse(trader5Result.body).data.data);

        let tokenTrader5Result = await connection.getTokenAccount(
            trader5,
            trader5,
            gasLimit
        );

        let tokenTrader5Model = JSON.parse(JSON.parse(tokenTrader5Result.body).data.data);

        console.log('TRADER ' + trader5Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader5Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader5Model.balanceEnabled);
    }catch(error){
        console.log('ERROR IN EXAMPLE 4 IN TESTING ENDPOINT');
        throw new Error(error);
    }
}
module.exports.example4_scenario1 = example4_scenario1;

async function example5_scenario2(){
    try{
  const accounts = await web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        //console.log(accounts)

        //Delegating accounts addresses/ids
        let trackId1 = accounts[1];
        let trader1 = accounts[2]; //Artist
        let trader2 = accounts[3];
        let trader3 = accounts[4]; //this is the design, the accounts of balances are separated from the traders
        let trader4 = accounts[5];
        let trader5 = accounts[6];
        let trader6 = accounts[7];
        //Delegating agreements addresses
        //track1
        let agreement1Id = accounts[8];
        let agreement2Id = accounts[9];
        let agreement3Id = accounts[10];
        let agreement4Id = accounts[11];
        let agreement5Id = accounts[12];

        //ContractAddresses
        let TAContractAddressData = await connection.getTAContractAddress();
        let TAContractAddress = (JSON.parse(TAContractAddressData.body).data.data).replace(/\"/g, "");

        let traderContractAddressData = await connection.getTraderContractAddress();
        let traderContractAddress = (JSON.parse(traderContractAddressData.body).data.data).replace(/\"/g, "");

        let trackContractAddressData = await connection.getTrackContractAddress();
        let trackContractAddress = (JSON.parse(trackContractAddressData.body).data.data).replace(/\"/g, "");

        //Creating and testing tracks
        let track1Isrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        await connection.createTrack(
            trackId1,
            track1Isrc,
            'track1',
            10,
            trader1,
            gasLimit);

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

        await connection.createTrader(
            trader5,
            "trader5",
            trader5,
            TAContractAddress,
            trader5,
            gasLimit);

            await connection.createTrader(
                trader6,
                "trader6",
                trader6,
                TAContractAddress,
                trader6,
                gasLimit);

        // //Agreement 1
        await connection.createAgreement(
            agreement1Id,
            trader1,
            trader2,
            25,
            trackId1,
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
            25,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 3
        await connection.createAgreement(
            agreement3Id,
            trader2,
            trader4,
            50,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 4
        await connection.createAgreement(
            agreement4Id,
            trader3,
            trader5,
            50,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        await connection.createAgreement(
            agreement5Id,
            trader4,
            trader6,
            50,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Starts distribution
        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit);

        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit
        );
        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit
        );
        await connection.distribution(
            trackId1,
            trader1,
            new Date().getTime(),
            trader1,
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

        //trader 5
         let trader5Result = await connection.getTraderDetail(
            trader5,
            trader5,
            gasLimit);

        let trader5Model = JSON.parse(JSON.parse(trader5Result.body).data.data);

        let tokenTrader5Result = await connection.getTokenAccount(
            trader5,
            trader5,
            gasLimit
        );

        let tokenTrader5Model = JSON.parse(JSON.parse(tokenTrader5Result.body).data.data);

        console.log('TRADER ' + trader5Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader5Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader5Model.balanceEnabled);

        //trader 6
        let trader6Result = await connection.getTraderDetail(
            trader6,
            trader6,
            gasLimit);

        let trader6Model = JSON.parse(JSON.parse(trader6Result.body).data.data);

        let tokenTrader6Result = await connection.getTokenAccount(
            trader6,
            trader6,
            gasLimit
        );

        let tokenTrader6Model = JSON.parse(JSON.parse(tokenTrader6Result.body).data.data);

        console.log('TRADER ' + trader6Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader6Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader6Model.balanceEnabled);
    }catch(error){
        console.log('ERROR IN EXAMPLE 5 IN TESTING ENDPOINT');
        throw new Error(error);
    }
}
module.exports.example5_scenario2 = example5_scenario2;

async function example6(){
    try{
  const accounts = await web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        //console.log(accounts)

        //Delegating accounts addresses/ids
        let trackId1 = accounts[1];
        let trader1 = accounts[2]; //Artist
        let trader2 = accounts[3];
        let trader3 = accounts[4]; //this is the design, the accounts of balances are separated from the traders
        let trader4 = accounts[5];
        let trader5 = accounts[6];
        let trader6 = accounts[7];
        let trader7 = accounts[8];
        //Delegating agreements addresses
        //track1
        let agreement1Id = accounts[9];
        let agreement2Id = accounts[10];
        let agreement3Id = accounts[11];
        let agreement4Id = accounts[12];
        let agreement5Id = accounts[13];
        let agreement6Id = accounts[14];

        //ContractAddresses
        let TAContractAddressData = await connection.getTAContractAddress();
        let TAContractAddress = (JSON.parse(TAContractAddressData.body).data.data).replace(/\"/g, "");

        let traderContractAddressData = await connection.getTraderContractAddress();
        let traderContractAddress = (JSON.parse(traderContractAddressData.body).data.data).replace(/\"/g, "");

        let trackContractAddressData = await connection.getTrackContractAddress();
        let trackContractAddress = (JSON.parse(trackContractAddressData.body).data.data).replace(/\"/g, "");

        //Creating and testing tracks
        let track1Isrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        await connection.createTrack(
            trackId1,
            track1Isrc,
            'track1',
            1000,
            trader1,
            gasLimit);

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

        await connection.createTrader(
            trader5,
            "trader5",
            trader5,
            TAContractAddress,
            trader5,
            gasLimit);

        await connection.createTrader(
            trader6,
            "trader6",
            trader6,
            TAContractAddress,
            trader6,
            gasLimit);

        await connection.createTrader(
            trader7,
            "trader7",
            trader7,
            TAContractAddress,
            trader7,
            gasLimit);

        // //Agreement 1
        await connection.createAgreement(
            agreement1Id,
            trader1,
            trader2,
            90,
            trackId1,
            traderContractAddress, //TODO: fix this
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 2
        await connection.createAgreement(
            agreement2Id,
            trader2,
            trader3,
            5,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 3
        await connection.createAgreement(
            agreement3Id,
            trader2,
            trader4,
            5,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Agreement 4
        await connection.createAgreement(
            agreement4Id,
            trader2,
            trader5,
            5,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );
        //Agreement 5
        await connection.createAgreement(
            agreement5Id,
            trader4,
            trader6,
            44,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );
        //Agreement 6
        await connection.createAgreement(
            agreement6Id,
            trader4,
            trader7,
            44,
            trackId1,
            traderContractAddress,
            trackContractAddress,
            trader1,
            gasLimit
        );

        //Starts distribution
        await connection.distribution(
            trackId1,
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

        //trader 5
        let trader5Result = await connection.getTraderDetail(
            trader5,
            trader5,
            gasLimit);

        let trader5Model = JSON.parse(JSON.parse(trader5Result.body).data.data);

        let tokenTrader5Result = await connection.getTokenAccount(
            trader5,
            trader5,
            gasLimit
        );

        let tokenTrader5Model = JSON.parse(JSON.parse(tokenTrader5Result.body).data.data);

        console.log('TRADER ' + trader5Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader5Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader5Model.balanceEnabled);

        //trader 6
        let trader6Result = await connection.getTraderDetail(
            trader6,
            trader6,
            gasLimit);

        let trader6Model = JSON.parse(JSON.parse(trader6Result.body).data.data);

        let tokenTrader6Result = await connection.getTokenAccount(
            trader6,
            trader6,
            gasLimit
        );

        let tokenTrader6Model = JSON.parse(JSON.parse(tokenTrader6Result.body).data.data);

        console.log('TRADER ' + trader6Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader6Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader6Model.balanceEnabled);

        //trader 7
        let trader7Result = await connection.getTraderDetail(
            trader7,
            trader7,
            gasLimit);

        let trader7Model = JSON.parse(JSON.parse(trader7Result.body).data.data);

        let tokenTrader7Result = await connection.getTokenAccount(
            trader7,
            trader7,
            gasLimit
        );

        let tokenTrader7Model = JSON.parse(JSON.parse(tokenTrader7Result.body).data.data);

        console.log('TRADER ' + trader7Model.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader7Model.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader7Model.balanceEnabled);
    }catch(error){
        console.log('ERROR IN EXAMPLE 6 IN TESTING ENDPOINT');
        throw new Error(error);
    }
}
module.exports.example6 = example6;

