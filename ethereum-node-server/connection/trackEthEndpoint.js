const contract = require('truffle-contract');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const tracks_artifact = require('../build/contrats/Tracks.json');
var TracksContract = contract(tracks_artifact);

module.exporst ={

    createTrack: async function(trackRequest){
        var self = this;
        TracksContract.setProvider();
    }
}
