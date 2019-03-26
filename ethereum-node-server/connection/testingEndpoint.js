const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const tracks_artifact = require('../build/contracts/Tracks.json');
const TrackContract = contractTruffle(tracks_artifact);
// TrackContract.defaults({
//   gasLimit:'1000000',  //This is necessary as defaults
//   gas:'10'
// })
async function testing() {
    try {
        //console.log(web3Provider)
        TrackContract.setProvider(web3Provider.currentProvider);
        const trackInterface = await TrackContract.deployed();

        //console.log(trackInterface)
        const accounts = web3Provider.eth.accounts;
        console.log(accounts)

        let trackId = new Date().getUTCMilliseconds();//We are using integer since the structs in solidity
        await trackInterface.createTrack(trackId,'test',trackId, {from:accounts[1],gasLimit:'6721975'})
        let trackResult = await trackInterface.getTrack(trackId, {from:accounts[1],gasLimit:'6721975'});
        console.log(trackResult);
        // const result = await trackInterface.getTrack.call(1004);
        // console.log(result[0])
        // console.log('ADDRESS');
        // console.log(trackInterface.address);
    } catch (error) {
        console.log(error)
    }
}
testing();
