const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const AgreementModel = require('../models/agreementModel.js');
//Artifacts
const agreements_artifact = require('../build/contracts/Agreements.json');
//Contract
const AgreementsContract = contractTruffle(agreements_artifact);
//Setting Providers
AgreementsContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract

async function createAgreement(agreementId, emitterId, receiverId, percentage, trackId, tradersCtrAddr, tracksCtrAddr, fromAddress, gasLimit) {
    try {
        const agreementsInterface = await AgreementsContract.deployed();

        await agreementsInterface.createAgreement(
            agreementId,
            emitterId,
            receiverId,
            percentage,
            trackId,
            tradersCtrAddr,
            tracksCtrAddr,
            {
                from: fromAddress,
                gasLimit: gasLimit
            });
        console.log('AGREEMENT CREATION SUCCESFUL');

    } catch (error) {
        console.log(error)
    }
}
module.exports.createAgreement = createAgreement;

async function getAgreement(agreementId, fromAddress, gasLimit) {
    let agreementModel = new AgreementModel(null, null, null, null, null);
    const agreementInterface = await AgreementsContract.deployed();
    let agreementResult = await agreementInterface.getAgreement(
        agreementId,
        {
            from: fromAddress,
            gasLimit: gasLimit
        });
    agreementModel.agreementId = agreementResult[0];
    agreementModel.traderEmiterId = agreementResult[1];
    agreementModel.traderReceiverId = agreementResult[2];
    agreementModel.percentage = agreementResult[3].toString();
    agreementModel.trackId = agreementResult[4];
    console.log('TRACK RESULT:');
    console.log(agreementResult);

    return agreementModel;
}
module.exports.getAgreement = getAgreement;

async function getAgreementsByEmitter(emitterId) {
    const agreementInterface = await AgreementsContract.deployed();
    let agreementsResult = await agreementInterface.getAgreementsByEmitter(
        emitterId,
        {
            from: fromAddress,
            gasLimit: gasLimit
        });
    return agreementsResult;
}
module.exports.getAgreementsByEmitter = getAgreementsByEmitter;