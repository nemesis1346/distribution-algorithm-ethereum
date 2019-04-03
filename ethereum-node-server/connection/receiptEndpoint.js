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

async function createReceipts(
    receiptId,
    trackId,
    ammount,
    traderEmitterId,
    traderReceiverId,
    agreementId,
    paymentStatus,
    datetime,
    uploaderId,
    percentageReceiver,
    fromAddress,
    gasLimit) {
    try {
        await ReceiptsContract.createReceipt(
            receiptId,
            trackId,
            ammount,
            traderEmitterId,
            traderReceiverId,
            agreementId,
            paymentStatus,
            datetime,
            uploaderId,
            percentageReceiver,
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
module.exports.createReceipts = createReceipts;

async function getReceipt(receiptId, fromAddress, gasLimit) {
    try {
        let receiptModel = new ReceiptModel(null, null, null, null, null, null, null, null, null, null);
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
        receiptModel.traderEmitterId = receiptResult[3];
        receiptModel.traderReceiverId = receiptResult[4];
        receiptModel.agreementId = receiptResult[5];
        receiptModel.paymentStatus = receiptResult[6];
        receiptModel.datetime = receiptResult[7];
        receiptModel.uploaderId = receiptResult[8];
        receiptModel.percentageReceiver = receiptResult[9];

        return receiptModel;
    } catch (error) {
        console.log(error);
    }
}
module.exports.getReceipt = getReceipt;

async function getReceiptsContractAddress() {
    const receiptsInterface = await ReceiptsContract.deployed();
    return receiptsInterface.address;
}
module.exports.getReceiptsContractAddress = getReceiptsContractAddress;