const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//Artifacts
const receipts_artifacts = require('../build/contracts/Receipts.json');
//Contract
const ReceiptsContract = contractTruffle(receipts_artifacts);
//Setting Providers
ReceiptsContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract
const ReceiptModel = require('../models/receiptModel.js');

async function createReceipt(
    receiptId,
    trackId,
    ammount,
    agreementId,
    datetime,
    fromAddress,
    gasLimit) {
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
    }
}
module.exports.createReceipt = createReceipt;

async function getReceipt(receiptId, fromAddress, gasLimit) {
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
    }
}
module.exports.getReceipt = getReceipt;

async function validateReceipt(
    receiptId,
    agreementId,
    traderEmitterId,
    traderReceiverId,
    trackId,
    datetime,
    agreementCtrAddr,
    fromAddress,
    gasLimit) {
    try {
        const receiptsInterface = await ReceiptsContract.deployed();
        let result = await receiptsInterface.validateReceipt(
            receiptId,
            agreementId,
            traderEmitterId,
            traderReceiverId,
            trackId,
            datetime,
            agreementCtrAddr,
            {
                from: fromAddress,
                gasLimit: gasLimit
            }
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}
module.exports.validateReceipt = validateReceipt;
async function getReceiptsContractAddress() {
    const receiptsInterface = await ReceiptsContract.deployed();
    return receiptsInterface.address;
}

module.exports.getReceiptsContractAddress = getReceiptsContractAddress;