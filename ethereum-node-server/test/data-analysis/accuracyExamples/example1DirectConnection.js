require("regenerator-runtime/runtime");

//Truffle configuration
const truffleConfiguration = require('../../../truffle.js');
const PORT = truffleConfiguration.networks.development.port;
const HOST = truffleConfiguration.networks.development.host;

const Web3 = require('web3');
console.log(Web3);
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
const Utils = require('../../../resources/Utils.js');

async function example1() {

    try {
        const accounts = await web3Provider.eth.accounts;
        console.log('accounts*******************');
        console.log(accounts);

        //Delegating accounts addresses/ids
        let trackId = Utils.getRandomItem(accounts);
        let trader1 = Utils.getRandomItem(accounts);
        let trader2 = Utils.getRandomItem(accounts);
        let trader3 = Utils.getRandomItem(accounts);
        let trader4 = Utils.getRandomItem(accounts);
        let agreement1Id = Utils.getRandomItem(accounts);
        let agreement2Id = Utils.getRandomItem(accounts);
        let agreement3Id = Utils.getRandomItem(accounts);

        let TAContractAddressData = await tokenAccountEndpoint.getTAContractAddress();
        let TAContractAddress = TAContractAddressData.data.replace(/\"/g, "");
        let traderContractAddressData = await traderEndpoint.getTraderContractAddress();
        let traderContractAddress = traderContractAddressData.data.replace(/\"/g, "");
        let trackContractAddressData = await trackEndpoint.getTrackContractAddress();
        let trackContractAddress = trackContractAddressData.data.replace(/\"/g, "");


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
            TAContractAddress,
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
            TAContractAddress,
            trader2,
            gasLimit
        );

        await traderEndpoint.createTrader(
            createTrader2Req);

        let createTrader3Req = new CreateTraderRequest(
            trader3,
            "trader3",
            trader3,
            TAContractAddress,
            trader3,
            gasLimit
        );

        await traderEndpoint.createTrader(
            createTrader3Req);

        let createTrader4Req = new CreateTraderRequest(
            trader4,
            "trader4",
            trader4,
            TAContractAddress,
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
            traderContractAddress,
            trackContractAddress,
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
            traderContractAddress,
            trackContractAddress,
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
            traderContractAddress,
            trackContractAddress,
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

        console.log('TRADERS OUTPUT----------------------');
        //Trader1
        let getTrader1Req = new GetTraderRequest(
            trader1,
            trader1,
            gasLimit
        );
        let trader1ResultRaw = await traderEndpoint.getTrader(
            getTrader1Req);

        let trader1Result = JSON.parse(trader1ResultRaw.data);


        let getTA1Req = new GetTARequest(
            trader1,
            trader1,
            gasLimit
        );

        let tokenTrader1ResultRaw = await tokenAccountEndpoint.getTokenAccount(
            getTA1Req
        );

        let tokenTrader1Result = JSON.parse(tokenTrader1ResultRaw.data);

        console.log('TRADER RESULT --------------------------');
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
        let trader2ResultRaw = await traderEndpoint.getTrader(
            getTrader2Req);

        let trader2Result = JSON.parse(trader2ResultRaw.data);

        let getTA2Req = new GetTARequest(
            trader2,
            trader2,
            gasLimit
        );

        let tokenTrader2ResultRaw = await tokenAccountEndpoint.getTokenAccount(
            getTA2Req
        );

        let tokenTrader2Result = JSON.parse(tokenTrader2ResultRaw.data);

        console.log('TRADER ' + trader2Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader2Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader2Result.balanceEnabled);

        // Trader 3
        let getTrader3Req = new GetTraderRequest(
            trader3,
            trader3,
            gasLimit
        );

        let trader3ResultRaw = await traderEndpoint.getTrader(
            getTrader3Req);

        let trader3Result = JSON.parse(trader3ResultRaw.data);

        let getTA3Req = new GetTARequest(
            trader3,
            trader3,
            gasLimit
        );

        let tokenTrader3ResultRaw = await tokenAccountEndpoint.getTokenAccount(
            getTA3Req
        );

        let tokenTrader3Result = JSON.parse(tokenTrader3ResultRaw.data);

        console.log('TRADER ' + trader3Result.name + ' *******');
        console.log('BALANCE DISABLED:');
        console.log(tokenTrader3Result.balanceDisabled);
        console.log('BALANCE ENABLED');
        console.log(tokenTrader3Result.balanceEnabled);

        // Trader4
        let getTrader4Req = new GetTraderRequest(
            trader4,
            trader4,
            gasLimit
        );

        let trader4ResultRaw = await traderEndpoint.getTrader(
            getTrader4Req);

        let trader4Result = JSON.parse(trader4ResultRaw.data);

        let getTA4Req = new GetTARequest(
            trader4,
            trader4,
            gasLimit
        );

        let tokenTrader4ResultRaw = await tokenAccountEndpoint.getTokenAccount(
            getTA4Req
        );

        let tokenTrader4Result = JSON.parse(tokenTrader4ResultRaw.data);

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
// example1();