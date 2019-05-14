const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const TokenAccountModel = require('../models/tokenAccountModel');
const DataModel = require('../models/dataModel.js');
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
        let resultAddEnabledBalance = await tokenAccountsInterface.addEnabledBalance(
            tokenAccountId,
            ammount,
            {
                from: fromAddress,
                gasLimit: gasLimit
            });
        console.log('BALANCE ENABLED ADDED');
        return resultAddEnabledBalance;
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.addEnabledBalance = addEnabledBalance;
async function addDisabledBalance(tokenAccountId, ammount, fromAddress, gasLimit) {
    try {
        const tokenAccountsInterface = await TokenAccountsContract.deployed();
        let resultAddDisabledBalance = await tokenAccountsInterface.addDisabledBalance(
            tokenAccountId,
            ammount,
            {
                from: fromAddress,
                gasLimit: gasLimit
            });
        console.log('BALANCE DISABLED ADDED');
        return resultAddDisabledBalance;
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.addDisabledBalance = addDisabledBalance;
async function getTAContractAddress() {
    let dataModel = new DataModel(null, null, null);
    try {
        const tokenAccountsInterface = await TokenAccountsContract.deployed();
        dataModel.data = JSON.stringify(tokenAccountsInterface.address);
        dataModel.status = '200';
        return dataModel;
    }
    catch (error) {
        throw new Error(error);
    }

}
module.exports.getTAContractAddress = getTAContractAddress;

async function getTokenAccount(request) {
    let dataModel = new DataModel(null, null, null);
    console.log('*************************************');
    console.log('Get Token Account Request in Composer.js');
    console.log(request);
    try {
        let tokenAccountId = request.tokenAccountId;
        let fromAddress = request.fromAddress;
        let gasLimit = request.gasLimit;

        const tokenAccountsInterface = await TokenAccountsContract.deployed();
        let tokenAccountModel = new TokenAccountModel(null, null, null);
        let tokenAccountResult = await tokenAccountsInterface.getTokenAccount(
            tokenAccountId,
            {
                from: fromAddress,
                gasLimit: gasLimit
            }
        );
        tokenAccountModel.tokenAccountId = tokenAccountResult[0];
        tokenAccountModel.balanceEnabled = tokenAccountResult[1].toString();
        tokenAccountModel.balanceDisabled = tokenAccountResult[2].toString();

        dataModel.data = JSON.stringify(tokenAccountModel);
        dataModel.status = '200';
        return dataModel;
    } catch (error) {
        console.log(error);
        throw new Error(dataModel);
    }
}
module.exports.getTokenAccount = getTokenAccount;