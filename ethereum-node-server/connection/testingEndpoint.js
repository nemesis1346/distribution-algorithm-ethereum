const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

//Artifacts
const tracks_artifact = require('../build/contracts/Tracks.json');
const trader_artifact = require('../build/contracts/Traders.json');
const tokenAccounts_artifacts = require('../build/contracts/TokenAccounts.json');

//Contracts
const TracksContract = contractTruffle(tracks_artifact);
const TradersContract = contractTruffle(trader_artifact);
const TokenAccountsContract = contractTruffle(tokenAccounts_artifacts);
// TrackContract.defaults({
//   gasLimit:'1000000',  //This is necessary as defaults
//   gas:'10'
// })
async function testing() {
    try {
        //Setting Providers
        TracksContract.setProvider(web3Provider.currentProvider);
        TradersContract.setProvider(web3Provider.currentProvider);
        TokenAccountsContract.setProvider(web3Provider.currentProvider);
        //Getting the interface of the deployed contract
        const tracksInterface = await TracksContract.deployed();
        const tradersInterface = await TradersContract.deployed();
        const tokenAccountsInterface = await TokenAccountsContract.deployed();

        const accounts = web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        console.log(accounts)

        //Creating and testing tracks
        let trackId = new Date().getUTCMilliseconds();//We are using integer since the structs in solidity
        await tracksInterface.createTrack(trackId, 'test', 100, { from: accounts[1], gasLimit: '6721975' });
        let trackResult = await tracksInterface.getTrack(trackId, { from: accounts[1], gasLimit: '6721975' });
        console.log(trackResult[0].c[0]);

        //Creating and testing traders
        console.log(tradersInterface.address);
        let traderId = new Date().getUTCMilliseconds();
        let resultCreateTrader = await tradersInterface.createTrader(traderId, 'name', "email", "DISTRIBUTOR", traderId, tokenAccountsInterface.address, { from: accounts[1], gasLimit: '6721975' });
        console.log("Create Trader Logs");
        console.log(resultCreateTrader.logs[0]); //It was succesfully created
       
        let traderResult = await tradersInterface.getTrader(traderId, { from: accounts[1], gasLimit: '6721975' });
        console.log("Get Trader Result");
        console.log(traderResult);

    } catch (error) {
        console.log(error)
    }
}
testing();
