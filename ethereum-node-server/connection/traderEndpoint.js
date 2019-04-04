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


async function createTrader(traderId, name, tokenAccountId, tokenAccountAdd, fromAddress, gasLimit) {
    try {
        const tradersInterface = await TradersContract.deployed();
        await tradersInterface.createTrader(
            traderId,
            name,
            tokenAccountId,
            tokenAccountAdd,
            {
                from: fromAddress,
                gasLimit: gasLimit
            });
        console.log('TRADER CREATION SUCCESFUL');

    } catch (error) {
        console.log(error)
    }
}
module.exports.createTrader = createTrader;

async function getTrader(traderId, fromAddress, gasLimit) {
    let traderModel = new TraderModel(null, null, null);
    const traderInterface = await TradersContract.deployed();
    let traderResult = await traderInterface.getTrader(
        traderId,
        {
            from: fromAddress,
            gasLimit: gasLimit
        });
    traderModel.traderId = traderResult[0];
    traderModel.name = traderResult[1];
    traderModel.tokenAccountId = traderResult[2];

    console.log('TRADER '+traderModel.name+" GOTTEN");

    return traderModel;
}
module.exports.getTrader = getTrader;

async function getTraderContractAddress() {
    const traderInterface = await TradersContract.deployed();

    return traderInterface.address;
}
module.exports.getTraderContractAddress = getTraderContractAddress;

