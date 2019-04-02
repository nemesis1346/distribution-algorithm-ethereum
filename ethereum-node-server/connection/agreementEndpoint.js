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

async function createAgreement(trackId, isrc, title, revenue, fromAddress, gasLimit) {
  try {
    const tracksInterface = await TracksContract.deployed();

    await tracksInterface.createTrack(
      trackId,
      isrc,
      title,
      revenue,
      {
        from: fromAddress,
        gasLimit: gasLimit
      });
    console.log('TRACK CREATION SUCCESFUL');

  } catch (error) {
    console.log(error)
  }
}
module.exports.createTrack = createTrack;

async function getTrack(trackId, fromAddress, gasLimit) {
  let agreementModel = new AgreementModel(null, null, null,null,null);
  const tracksInterface = await TracksContract.deployed();
  let trackResult = await tracksInterface.getTrack(
    trackId,
    {
      from: fromAddress,
      gasLimit: gasLimit
    });
  trackModel.trackId = trackResult[0];
  trackModel.isrc = trackResult[1].toString();
  trackModel.title = trackResult[2];
  trackModel.revenueTotal = trackResult[3].toString();
  trackModel.uploaderId = trackResult[4];
  console.log('TRACK RESULT:');
  console.log(trackResult);

  return trackModel;
}
module.exports.getTrack = getTrack;
