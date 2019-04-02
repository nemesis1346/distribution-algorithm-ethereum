const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const TokenAccountModel = require('../models/tokenAccountModel');
//Artifacts
const tokenAccounts_artifacts = require('../build/contracts/TokenAccounts.json');
//Contract
const TokenAccountsContract = contractTruffle(tokenAccounts_artifacts);
//Setting Providers
TokenAccountsContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract


async function getTAContractAddress() {
    const tokenAccountsInterface = await TokenAccountsContract.deployed();

    return tokenAccountsInterface.address;
}
module.exports.getTAContractAddress = getTAContractAddress;