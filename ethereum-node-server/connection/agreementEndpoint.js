//Truffle COnfiguration
const truffleConfiguration=require('../truffle.js');
const PORT = truffleConfiguration.networks.development.port;
const HOST = truffleConfiguration.networks.development.host;

const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://' + HOST + ':' + PORT));
const AgreementModel = require('../models/agreementModel.js');
const DataModel = require('../models/dataModel.js');
//Artifacts
const agreements_artifact = require('../build/contracts/Agreements.json');
//Contract
const AgreementsContract = contractTruffle(agreements_artifact);
//Setting Providers
AgreementsContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract


async function createAgreement(request) {
    let dataModel = new DataModel(null, null, null);
    console.log('************************************');
    console.log('Request Create Agreement in AgreementEndpoint.js: ');
    console.log(request);
    try {
        const agreementsInterface = await AgreementsContract.deployed();

        await agreementsInterface.createAgreement(
            request.agreementId,
            request.emitterId,
            request.receiverId,
            request.percentage,
            request.trackId,
            request.traderContractAddress,
            request.trackContractAddress,
            {
                from: request.fromAddress,
                gasLimit: request.gasLimit
            });
            //TODO: Validation

        dataModel.data = JSON.stringify("Agreement Created Correctly");
        dataModel.status = '200';

        return dataModel;
    } catch (error) {
        console.log('ERROR IN AGREEMENT CREATION');
        throw new Error(error);
    }
}
module.exports.createAgreement = createAgreement;

async function getAgreement(agreementId, fromAddress, gasLimit) {
   // let dataModel = new DataModel(null, null, null);
    // console.log('************************************');
    // console.log('Request Get Agreement in AgreementEndpoint.js: ');
    // console.log(agreementId);
    try{
        let agreementModel = new AgreementModel(null, null, null, null, null);
        const agreementInterface = await AgreementsContract.deployed();
        let agreementResult = await agreementInterface.getAgreement(
            agreementId,
            {
                from: fromAddress,
                gasLimit: gasLimit
            });
        agreementModel.agreementId = agreementResult[0];
        agreementModel.traderEmitterId = agreementResult[1];
        agreementModel.traderReceiverId = agreementResult[2];
        agreementModel.percentage = parseFloat(agreementResult[3].toString())/100;
        agreementModel.trackId = agreementResult[4];
        console.log('AGREEMENT '+agreementModel.agreementId+" GOTTEN");
        return agreementModel;
    }catch(error){
        console.log('ERROR IN GET AGREEMENT');
        throw new Error(error);
    }
 
}
module.exports.getAgreement = getAgreement;

async function getAgreementsByEmitter(emitterId, fromAddress, gasLimit) {
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

async function getAgreementContractAddress(){
    let dataModel = new DataModel(null, null, null);
    try {
        const agreementInterface = await AgreementsContract.deployed();
        dataModel.data = JSON.stringify(agreementInterface.address);
        dataModel.status = '200';
        return dataModel;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports.getAgreementContractAddress = getAgreementContractAddress;