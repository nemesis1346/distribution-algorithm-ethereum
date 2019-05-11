const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const TraderModel = require('../models/traderModel.js');
//Artifacts
const trader_artifact = require('../build/contracts/Traders.json');
//Contract
const TradersContract = contractTruffle(trader_artifact);
//Setting Providers
TradersContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract

//Event listening
async function listenTraderEvents(){
    const tradersInterface =  await TradersContract.deployed();
   //console.log(tradersInterface);
    let traderLogsEvent = tradersInterface.contract.events.stringLogs();
    console.log(traderLogsEvent);
    traderLogsEvent.watch(function(error, result){
        if(!error){
            console.log('Traders EVENT');
            console.log(result);
        }   
    });
}


async function createTrader(request) {
    let dataModel = new DataModel(null, null, null);
    console.log('************************************');
    console.log('Request Create Trader in Composer.js: ');
    console.log(request);
    try {
        const tradersInterface = await TradersContract.deployed();
        await tradersInterface.createTrader(
            request.traderId,
            request.name,
            request.tokenAccountId,
            request.tokenAccountAdd,
            {
                from: request.fromAddress,
                gasLimit: request.gasLimit
            });
            dataModel.data = JSON.stringify('Participant ' + request.traderId + ' created succesfully');
            dataModel.status = '200';

            return dataModel;

    } catch (error) {
        console.log(error)
    }
}
module.exports.createTrader = createTrader;

async function getTrader(request) {
    let dataModel = new DataModel(null, null, null);
    console.log('*******************************');
    console.log("Request Trader Detail in Composer.js: ");
    console.log(request.traderId);
    try{
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
    }catch(error){
        throw new Error(error);
    }
}
module.exports.getTrader = getTrader;

async function getTraderContractAddress() {
    const traderInterface = await TradersContract.deployed();
    return traderInterface.address;
}
module.exports.getTraderContractAddress = getTraderContractAddress;

