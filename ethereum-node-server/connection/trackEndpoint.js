const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const TrackModel = require('../models/trackModel.js');
//Artifacts
const tracks_artifact = require('../build/contracts/Tracks.json');
//Contract
const TracksContract = contractTruffle(tracks_artifact);
//Setting Providers
TracksContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract

async function createTrack(trackId, isrc, title, revenue, fromAddress, gasLimit) {
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
    console.log(error);
  }
}
module.exports.createTrack = createTrack;

async function getTrack(trackId, fromAddress, gasLimit) {
  try {
    let trackModel = new TrackModel(null, null, null, null, null);
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
    console.log('TRACK ' + trackModel.title + " GOTTEN");
    return trackModel;

  } catch (error) {
    console.log(error);
  }
}
module.exports.getTrack = getTrack;

async function getTrackContractAddress() {
  try {
    const tracksInterface = await TracksContract.deployed();
    return tracksInterface.address;
  } catch (error) {
    console.log(error);
  }

}
module.exports.getTrackContractAddress = getTrackContractAddress;