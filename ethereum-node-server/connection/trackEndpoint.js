const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//Artifacts
const tracks_artifact = require('../build/contracts/Tracks.json');
//Contract
const TracksContract = contractTruffle(tracks_artifact);
//Setting Providers
TracksContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract
//Models
const DataModel = require("../models/dataModel");
const TrackModel = require('../models/trackModel');

async function createTrack(request) {
  let dataModel = new DataModel(null, null, null);
  console.log('************************************');
  console.log('Request Create Track in trackEndpoint.js: ');
  try {

    let trackModel = new TrackModel(
      request.trackId,
      request.isrc,
      request.title,
      request.revenue,
      request.fromAddress
    );

    const tracksInterface = await TracksContract.deployed();

    await tracksInterface.createTrack(
      request.trackId,
      request.isrc,
      request.title,
      request.revenue,
      {
        from: request.fromAddress,
        gasLimit: request.gasLimit
      });
    console.log('Track added succesfully in Chaincode: ');
    console.log(request.isrc);

    dataModel.data = JSON.stringify(trackModel);
    dataModel.status = '200';

    return dataModel;

  } catch (error) {
    console.log('ERROR IN CREATE TRACK IN TRACK ENDPOINT');
    throw new Error(error);
  }
}
module.exports.createTrack = createTrack;

async function getTrack(trackId, fromAddress, gasLimit) {
  console.log('************************************');
  console.log('Request Get Track in trackEndpoint.js: ');
  console.log(trackId);
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
    trackModel.revenue = trackResult[3].toString();
    trackModel.uploaderId = trackResult[4];
    console.log('TRACK ' + trackModel.title + " GOTTEN");
    return trackModel;

  } catch (error) {
    console.log('ERROR IN GET TRACK IN TRACK ENDPOINT');
    throw new Error(error);

  }
}
module.exports.getTrack = getTrack;

async function getTrackContractAddress() {
  let dataModel = new DataModel(null, null, null);
  try {
    const tracksInterface = await TracksContract.deployed();
    dataModel.data = JSON.stringify(tracksInterface.address);
    dataModel.status = '200';
    return dataModel;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.getTrackContractAddress = getTrackContractAddress;

async function updateTrackRevenue(updateTrackRevenueRequest) {
  console.log('************************************');
  console.log('Request Update Track Revenue in trackEndpoint.js: ');
  console.log(updateTrackRevenueRequest);
  try {
    let trackId = updateTrackRevenueRequest.trackId;
    let revenue = updateTrackRevenueRequest.revenue;
    let fromAddress = updateTrackRevenueRequest.fromAddress;
    let gasLimit = updateTrackRevenueRequest.gasLimit;
    const tracksInterface = await TracksContract.deployed();
    let result = tracksInterface.updateTrackRevenue(
      trackId,
      revenue,
      {
        from: fromAddress,
        gasLimit: gasLimit
      });
    return result
  } catch (error) {
    console.log('ERROR IN GET TRACK IN TRACK ENDPOINT');
    throw new Error(error);
  }
}
module.exports.updateTrackRevenue = updateTrackRevenue;

//process.exit();