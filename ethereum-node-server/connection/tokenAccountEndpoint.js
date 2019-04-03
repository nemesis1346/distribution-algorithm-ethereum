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


async function addEnabledBalance(tokenAccountId, ammount, fromAddress, gasLimit) {
    try {
        const tokenAccountsInterface = await TokenAccountsContract.deployed();
        await tokenAccountsInterface.addEnabledBalance(
            tokenAccountId,
            ammount,
            {
                from: fromAddress,
                gasLimit: gasLimit
            });
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.addEnabledBalance = addEnabledBalance;
async function addDisabledBalance(tokenAccountId, ammount, fromAddress, gasLimit) {
    try {
        const tokenAccountsInterface = await TokenAccountsContract.deployed();
        await tokenAccountsInterface.addDisabledBalance(
            tokenAccountId,
            ammount,
            {
                from: fromAddress,
                gasLimit: gasLimit
            });
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.addDisabledBalance = addDisabledBalance;
async function getTAContractAddress() {
    try {
        const tokenAccountsInterface = await TokenAccountsContract.deployed();
        return tokenAccountsInterface.address;
    }
    catch (error) {
        console.log(error);
    }

}
module.exports.getTAContractAddress = getTAContractAddress;