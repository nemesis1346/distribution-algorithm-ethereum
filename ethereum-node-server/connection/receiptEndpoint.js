require("regenerator-runtime/runtime");

//Truffle Configuration
const truffleConfiguration = require('../truffle.js');
const PORT = truffleConfiguration.networks.development.port;
const HOST = truffleConfiguration.networks.development.host;

const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://' + HOST + ':' + PORT));
//Artifacts
const receipts_artifacts = require('../build/contracts/Receipts.json');
//Contract
const ReceiptsContract = contractTruffle(receipts_artifacts);
//Setting Providers
ReceiptsContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract
const ReceiptModel = require('../models/receiptModel.js');
const DataModel = require('../models/dataModel.js');

async function createReceipt(
    receiptId,
    trackId,
    ammount,
    agreementId,
    datetime,
    fromAddress,
    gasLimit) {
    let dataModel = new DataModel(null, null, null);
    try {
        const receiptsInterface = await ReceiptsContract.deployed();

        await receiptsInterface.createReceipt(
            receiptId,
            trackId,
            ammount,
            agreementId,
            datetime,
            {
                from: fromAddress,
                gasLimit: gasLimit
            }
        );
        console.log('RECEIPT CREATION SUCCESFUL');
    } catch (error) {
        console.log(error);
        dataModel.message = JSON.stringify(error);
        dataModel.status = '400';
        return dataModel;
    }
}
module.exports.createReceipt = createReceipt;

async function getReceipt(receiptId, fromAddress, gasLimit) {
    let dataModel = new DataModel(null, null, null);

    try {
        let receiptModel = new ReceiptModel(null, null, null, null, null);
        const receiptsInterface = await ReceiptsContract.deployed();
        let receiptResult = await receiptsInterface.getReceipt(
            receiptId,
            {
                from: fromAddress,
                gasLimit: gasLimit
            }
        );
        receiptModel.receiptId = receiptResult[0];
        receiptModel.trackId = receiptResult[1];
        receiptModel.ammount = receiptResult[2].toString();
        receiptModel.agreementId = receiptResult[3];
        receiptModel.datetime = receiptResult[4];

        return receiptModel;
    } catch (error) {
        console.log(error);
        dataModel.message = JSON.stringify(error);
        dataModel.status = '400';
        return dataModel;
    }
}
module.exports.getReceipt = getReceipt;

async function validateReceipt(
    agreementId,
    traderEmitterId,
    traderReceiverId,
    trackId,
    datetime,
    agreementCtrAddr,
    fromAddress,
    gasLimit) {
    let dataModel = new DataModel(null, null, null);

    try {
        const receiptsInterface = await ReceiptsContract.deployed();
        let result = await receiptsInterface.validateReceipt(
            agreementId,
            traderEmitterId,
            traderReceiverId,
            trackId,
            String(datetime),
            agreementCtrAddr,
            {
                from: fromAddress,
                gasLimit: gasLimit
            }
        );
        return result;
    } catch (error) {
        console.log(error);
        dataModel.message = JSON.stringify(error);
        dataModel.status = '400';
        return dataModel;
    }
}
module.exports.validateReceipt = validateReceipt;

async function getReceiptsContractAddress() {
    const receiptsInterface = await ReceiptsContract.deployed();
    return receiptsInterface.address;
}
module.exports.getReceiptsContractAddress = getReceiptsContractAddress;