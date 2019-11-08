require("regenerator-runtime/runtime");
//Import connectors and apis
const assetConnector = require('../ethereumcom/assetConnector');

//Models
const DataModel = require("../models/dataModel");
const TrackModel = require('../models/trackModel');

//THIS STRUCTURE IS READY FOR SAVING DATABASE OF TRANSACTIONS AND ALSO INTERACT WITH ETHEREUM

async function createAsset(request) {
  let dataModel = new DataModel(null, null, null);
  console.log('************************************');
  console.log('Request Create Track in trackEndpoint.js: ');
  console.log(request);
  try {

    // let trackModel = new TrackModel(
    //   request.trackId,
    //   request.isrc,
    //   request.title, //this is the asset name
    //   request.revenue,
    //   request.fromAddress
    // );

  
    // dataModel.data = JSON.stringify(trackModel);
    // dataModel.status = '200';

    // return dataModel;

    return 'test message';


  } catch (error) {
    console.log('ERROR IN CREATE TRACK IN TRACK ENDPOINT');
    console.log(error);
    dataModel.message = JSON.stringify(error);
    dataModel.status = '400';
    return dataModel;
  }
}
module.exports.createAsset = createAsset;

async function getTrack(trackId, fromAddress, gasLimit) {
  let dataModel = new DataModel(null, null, null);

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
    console.log(error);
    dataModel.message = JSON.stringify(error);
    dataModel.status = '400';
    return dataModel;

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
    console.log(error);
    dataModel.message = JSON.stringify(error);
    dataModel.status = '400';
    return dataModel;
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
    console.log(error);
    dataModel.message = JSON.stringify(error);
    dataModel.status = '400';
    return dataModel;
  }
}
module.exports.updateTrackRevenue = updateTrackRevenue;

