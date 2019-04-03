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

async function createReceipts(){

}
module.exports.createReceipts=createReceipts;

async function getReceipt(){

}
module.exports.getReceipt=getReceipt;

async function getReceiptsContractAddress() {
    const receiptsInterface = await ReceiptsContract.deployed();

    return receiptsInterface.address;
}
module.exports.getReceiptsContractAddress = getReceiptsContractAddress;