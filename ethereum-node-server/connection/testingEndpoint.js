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

        const accounts = await web3Provider.eth.accounts;
        console.log('NETWORK ACCOUNTS');
        console.log(accounts)

        //Delegating accounts addresses/ids
        let trackAddress = accounts[1];
        let traderEmitterAddress =accounts[2]; //Artist
        let traderReceiverAddress=accounts[3];
        let agreementAddress =accounts[4]; //this is the design, the accounts of balances are separated from the traders

        //Creating and testing tracks
        let traderIsrc = new Date().getUTCMilliseconds(); //OTHER WAY OF RANDOM IDENTIFIERS

        await tracksInterface.createTrack(
            trackAddress,
            traderIsrc,
            'test',
            100,
            { from: traderEmitterAddress, gasLimit: '6721975' });
        let trackResult = await tracksInterface.getTrack(trackAddress, { from: traderEmitterAddress, gasLimit: '6721975' });
        console.log('TRACK CREATION');
        console.log(trackResult);

        //Creating and testing traders
        //Creating Emitter
        await tradersInterface.createTrader(
            traderEmitterAddress,
            'emitter',
            traderEmitterAddress,
            tokenAccountsInterface.address,
            { from: traderEmitterAddress, gasLimit: '6721975' });
        let traderEmitterResult = await tradersInterface.getTrader(traderEmitterAddress, { from: traderEmitterAddress, gasLimit: '6721975' });
        console.log("EMMITER CREATION RESULT");
        console.log(traderEmitterResult);

        //Creating Receiver
        await tradersInterface.createTrader(
            traderReceiverAddress,
            'receiver',
            traderReceiverAddress,
            tokenAccountsInterface.address,
            { from: traderReceiverAddress, gasLimit: '6721975' });
            console.log('gets here');
        let traderReceiverResult = await tradersInterface.getTrader(traderReceiverAddress, { from: traderReceiverAddress, gasLimit: '6721975' });
        console.log("RECEIVER CREATION RESULT");
        console.log(traderReceiverResult);

        //Creating Agreements
        await agreementsInterface.createAgreement(
            agreementAddress,
            traderEmitterAddress,
            traderReceiverAddress,
            50,
            trackAddress,
            tradersInterface.address,
            tracksInterface.address,
            { from: agreementAddress, gasLimit: '6721975' });
        let agreementResult = await agreementsInterface.getAgreement(agreementAddress, { from: agreementAddress, gasLimit: '6721975' });
        console.log('AGREEMENT CREATION RESULT');
        console.log(agreementResult);

    } catch (error) {
        console.log(error)
    }
}
testing();
