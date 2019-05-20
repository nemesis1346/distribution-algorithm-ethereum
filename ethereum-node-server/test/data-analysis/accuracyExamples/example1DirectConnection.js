require("regenerator-runtime/runtime");

//Truffle configuration
const truffleConfiguration = require('../../../truffle.js');
const PORT = truffleConfiguration.networks.development.port;
const HOST = truffleConfiguration.networks.development.host;

const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://' + HOST + ':' + PORT));

//Endpoints
const trackEndpoint = require('../../../connection/trackEndpoint.js');
const traderEndpoint = require('../../../connection/traderEndpoint.js');
const tokenAccountEndpoint = require('../../../connection/tokenAccountEndpoint.js');
const agreementEndpoint = require('../../../connection/agreementEndpoint.js');
const distributionEndpoint = require('../../../connection/distributionEndPoint');
//Models
const CreateTrackRequest = require('../../../models/createTrackRequest.js');
const CreateTraderRequest = require('../../../models/createTraderRequest.js');
const CreateAgreementRequest = require('../../../models/createAgreementRequest.js');
const DistributionRequest = require('../../../models/distributionRequest.js');
const GetTraderRequest = require('../../../models/getTraderRequest.js');
const GetTARequest = require('../../../models/getTARequest.js');
const gasLimit = '6721975';

async function example1() {

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
        let createTrackRequest = new CreateTrackRequest(
            trackId,
            traderIsrc,
            'track',
            100,
            trader1,
            gasLimit
        );
        await trackEndpoint.createTrack(
            createTrackRequest);

        let createTrader1Req = new CreateTraderRequest(
            trader1,
            "trader1",
            trader1,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader1,
            gasLimit
        );

        //Creating Traders
        await traderEndpoint.createTrader(
            createTrader1Req);

        let createTrader2Req = new CreateTraderRequest(
            trader2,
            "trader2",
            trader2,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader2,
            gasLimit
        );

        await traderEndpoint.createTrader(
            createTrader2Req);

        let createTrader3Req = new CreateTraderRequest(
            trader3,
            "trader3",
            trader3,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader3,
            gasLimit
        );

        await traderEndpoint.createTrader(
            createTrader3Req);

        let createTrader4Req = new CreateTraderRequest(
            trader4,
            "trader4",
            trader4,
            await tokenAccountEndpoint.getTAContractAddress(),
            trader4,
            gasLimit
        );

        await traderEndpoint.createTrader(
            createTrader4Req);

        //Agreement 1
        let createAgreement1Req = new CreateAgreementRequest(
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

        await agreementEndpoint.createAgreement(
            createAgreement1Req
        );

        //Agreement 2
        let createAgreement2Req = new CreateAgreementRequest(
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
        await agreementEndpoint.createAgreement(
            createAgreement2Req
        );

        //Agreement 3
        let createAgreement3Req = new CreateAgreementRequest(
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
        await agreementEndpoint.createAgreement(
            createAgreement3Req
        );

        let distributionRequest = new DistributionRequest(
            trackId,
            trader1,
            new Date().getTime(),
            trader1,
            gasLimit
        );

        await distributionEndpoint.distribution(
            distributionRequest);

        //Results after
        console.log('TRADERS OUTPUT----------------------');
        console.log(trader1);
        //Trader1
        let getTrader1Req = new GetTraderRequest(
            trader1,
            trader1,
            gasLimit
        );
        let trader1Result = await traderEndpoint.getTrader(
            getTrader1Req);

        let getTA1Req = new GetTARequest(
            trader1,
            trader1,
            gasLimit
        );

        let tokenTrader1Result = await tokenAccountEndpoint.getTokenAccount(
            getTA1Req
        );

        console.log('TRADER ' + trader1Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader1Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader1Result.balanceEnabled);

        //Trader2
        let getTrader2Req = new GetTraderRequest(
            trader2,
            trader2,
            gasLimit
        );
        let trader2Result = await traderEndpoint.getTrader(
            getTrader2Req);

        let getTA2Req = new GetTARequest(
            trader2,
            trader2,
            gasLimit
        );

        let tokenTrader2Result = await traderEndpoint.getTrader(
            getTA2Req
        );

        console.log('TRADER ' + trader2Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader2Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader2Result.balanceEnabled);

        //Trader 3
        let getTrader3Req = new GetTraderRequest(
            trader3,
            trader3,
            gasLimit
        );

        let trader3Result = await traderEndpoint.getTrader(
            getTrader3Req);

        let getTA3Req = new GetTARequest(
            trader3,
            trader3,
            gasLimit
        );

        let tokenTrader3Result = await traderEndpoint.getTrader(
            getTA3Req
        );
        console.log('TRADER ' + trader3Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader3Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader3Result.balanceEnabled);

        //Trader4
        let getTrader4Req = new GetTraderRequest(
            trader4,
            trader4,
            gasLimit
        );

        let trader4Result = await traderEndpoint.getTrader(
            getTrader4Req);

        let getTA4Req = new GetTARequest(
            trader4,
            trader4,
            gasLimit
        );

        let tokenTrader4Result = await traderEndpoint.getTrader(
            getTA4Req
        );

        console.log('TRADER ' + trader4Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader4Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader4Result.balanceEnabled);
        counter++;
    } catch (error) {
        console.log(error)
    }
}

example1();
