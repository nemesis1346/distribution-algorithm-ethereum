const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
const tracks_artifact = require('../build/contracts/Tracks.json');
const TrackContract = contractTruffle(tracks_artifact);

module.exports ={

    createTrack: async function(){
        try {
          //console.log(web3Provider)
            TrackContract.setProvider(web3Provider.currentProvider);
            const trackInterface = await TrackContract.deployed();
      
            //console.log(trackInterface)
            const accounts = web3Provider.eth.accounts;
            console.log(accounts)

            await trackInterface.createTrack('test','test','test',100,'test', {from:accounts[1]})
      
          } catch (error) {
            console.log(error)
          }
    }
}
