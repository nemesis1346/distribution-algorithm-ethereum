const contractTruffle = require('truffle-contract');
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

//Artifacts
const tracks_artifact = require('../build/contracts/Tracks.json');
const trader_artifact = require('../build/contracts/Traders.json');
const tokenAccounts_artifacts = require('../build/contracts/TokenAccounts.json');
const agreements_artfact = require('../build/contracts/Agreements.json');

//Contracts
const TracksContract = contractTruffle(tracks_artifact);
const TradersContract = contractTruffle(trader_artifact);
const TokenAccountsContract = contractTruffle(tokenAccounts_artifacts);
const AgreementsContract = contractTruffle(agreements_artfact);
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
        AgreementsContract.setProvider(web3Provider.currentProvider);
        //Getting the interface of the deployed contract
        const tracksInterface = await TracksContract.deployed();
        const tradersInterface = await TradersContract.deployed();
        const tokenAccountsInterface = await TokenAccountsContract.deployed();
        const agreementsInterface = await AgreementsContract.deployed();

        const accounts = web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        console.log(accounts)

        //Creating and testing tracks
        let trackId = new Date().getUTCMilliseconds();//We are using integer since the structs in solidity
        await tracksInterface.createTrack(
            trackId,
            'test',
            100,
            { from: accounts[1], gasLimit: '6721975' });
        let trackResult = await tracksInterface.getTrack(trackId, { from: accounts[1], gasLimit: '6721975' });
        console.log('TRACK CREATION');
        console.log(trackResult);

        //Creating and testing traders
        //Creating Emitter
        //let traderEmitterId = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS
        await tradersInterface.createTrader(
            traderEmitterId,
            'emitter',
            "email",
            "DISTRIBUTOR",
            traderEmitterId,
            tokenAccountsInterface.address,
            { from: accounts[1], gasLimit: '6721975' });
        let traderEmitterResult = await tradersInterface.getTrader(traderEmitterId, { from: accounts[1], gasLimit: '6721975' });
        console.log("TRACK CREATION RESULT");
        console.log(traderEmitterResult);

        //Creating Receiver
        let traderReceiverId = new Date().getUTCMilliseconds();
        await tradersInterface.createTrader(
            traderReceiverId,
            'receiver',
            "email",
            "ARTIST",
            traderReceiverId,
            tokenAccountsInterface.address,
            { from: accounts[1], gasLimit: '6721975' });
        let traderReceiverResult = await tradersInterface.getTrader(traderReceiverId, { from: accounts[1], gasLimit: '6721975' });
        console.log("TRACK CREATION RESULT");
        console.log(traderReceiverResult);

        //Creating Agreements
        let agreementId = new Date().getUTCMilliseconds();
        await agreementsInterface.createAgreement(
            agreementId,
            traderEmitterId,
            traderReceiverId,
            50,
            "PENDING",
            trackId,
            "emitter",
            "receiver",
            tradersInterface.address,
            tracksInterface.address,
            { from: accounts[1], gasLimit: '6721975' });
        let agreementResult = await agreementsInterface.getAgreement(agreementId, { from: accounts[1], gasLimit: '6721975' });
        console.log('AGREEMENT CREATION RESULT');
        console.log(agreementResult);


    } catch (error) {
        console.log(error)
    }
}
testing();
