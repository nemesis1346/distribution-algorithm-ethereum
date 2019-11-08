
//Truffle Configuration
const truffleConfiguration = require('../truffle.js');
const PORT = truffleConfiguration.networks.development.port;
const HOST = truffleConfiguration.networks.development.host;

//Libraries
const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://' + HOST + ':' + PORT));
//Artifacts
const tracks_artifact = require('../build/contracts/Tracks.json');
//Contract
const TracksContract = contractTruffle(tracks_artifact);
//Setting Providers
TracksContract.setProvider(web3Provider.currentProvider);
//Getting the interface of the deployed contract

async function createAssetEthereum(request){
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
      return 'message';

}

module.exports.createAssetEthereum = createAssetEthereum;