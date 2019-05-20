const truffleConfiguration = require('../truffle.js');
const PORT = truffleConfiguration.networks.development.port;
const HOST = truffleConfiguration.networks.development.host;

const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://' + HOST + ':' + PORT));
const TraderModel = require('../models/traderModel.js');
const DataModel = require('../models/dataModel.js');
//Artifacts
const trader_artifact = require('../build/contracts/Traders.json');
//Contract
const TradersContract = contractTruffle(trader_artifact);
//Setting Providers
TradersContract.setProvider(web3Provider.currentProvider);

async function createTrader(request) {
    let dataModel = new DataModel(null, null, null);
    console.log('************************************');
    console.log('Request Create Trader in TraderEndpoint.js: ');
    console.log(request);
    try {
        const tradersInterface = await TradersContract.deployed();
        await tradersInterface.createTrader(
            request.traderId,
            request.name,
            request.tokenAccountId,
            request.TAContractAddress,
            {
                from: request.fromAddress,
                gasLimit: request.gasLimit
            });
        dataModel.data = JSON.stringify('Trader ' + request.traderId + ' created succesfully');
        dataModel.status = '200';

        return dataModel;

    } catch (error) {
        console.log(error)
    }
}
module.exports.createTrader = createTrader;

async function getTrader(request) {
    let dataModel = new DataModel(null, null, null);
    // console.log('*******************************');
    // console.log("Request Get Trader in TraderEndpoint.js: ");
    // console.log(request);
    try {
        let traderModel = new TraderModel(null, null, null);
        const traderInterface = await TradersContract.deployed();

        let traderResult = await traderInterface.getTrader(
            request.traderId,
            {
                from: request.fromAddress,
                gasLimit: request.gasLimit
            });
        traderModel.traderId = traderResult[0];
        traderModel.name = traderResult[1];
        traderModel.tokenAccountId = traderResult[2];

        dataModel.data = JSON.stringify(traderModel);
        dataModel.status = '200';

        return dataModel;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports.getTrader = getTrader;

async function getTraderContractAddress() {
    let dataModel = new DataModel(null, null, null);
    try {
        const traderInterface = await TradersContract.deployed();
        dataModel.data = JSON.stringify(traderInterface.address);
        dataModel.status = '200';
        return dataModel;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports.getTraderContractAddress = getTraderContractAddress;

