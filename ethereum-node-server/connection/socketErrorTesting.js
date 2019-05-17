'use strict';
const Web3 = require('web3');
const web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//const web3Provider = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));

const gasLimit = '6721975'; //this must come from the front end
const connection = require('../test/requestConnectionServer.js');

async function socketError() {
    try {
        if (!web3Provider.isConnected()) {
            console.log('error');
        } else {
            console.log('SUCCESSFUL CONNECTIONS');
            const accounts = await web3Provider.eth.accounts;
            console.log('NETWORK ACCOUNTS');
            //console.log(accounts)

            //Delegating accounts addresses/ids
            let trader1 = accounts[2]; //Artist
            let trader2 = accounts[3];
            //Delegating agreements addresses

            //Creating and testing tracks
            //ContractAddresses
            let TAContractAddressData = await connection.getTAContractAddress();
            let TAContractAddress = (JSON.parse(TAContractAddressData.body).data.data).replace(/\"/g, "");


            //  Creating Traders
            await connection.createTrader(
                trader1,
                "trader1",
                trader1,
                TAContractAddress,
                trader1,
                gasLimit);

            await connection.createTrader(
                trader2,
                "trader2",
                trader2,
                TAContractAddress,
                trader2,
                gasLimit);

            //Results after
            console.log('TRADERS OUTPUT----------------------');
            console.log(trader1);
            //Trader1
            let trader1Result = await connection.getTraderDetail(
                trader1,
                trader1,
                gasLimit);

            let trader1Model = JSON.parse(JSON.parse(trader1Result.body).data.data);

            console.log('TRADER ' + trader1Model.name + ' *******');

            //Trader2
            let trader2Result = await connection.getTraderDetail(
                trader2,
                trader2,
                gasLimit);

            let trader2Model = JSON.parse(JSON.parse(trader2Result.body).data.data);

            console.log('TRADER ' + trader2Model.name + ' *******');

            // await web3Provider.currentProvider.
              // refreshProvider()
            }


    } catch (error) {
        console.log('ERROR IN SOCKET ERROR IN TESTING ENDPOINT');
        throw new Error(error);
    }
}
module.exports.socketError = socketError;


//Another try
function refreshProvider(web3Obj, providerUrl) {
    let retries = 0

    function retry(event) {
        if (event) {
            debug('Web3 provider disconnected or errored.')
            retries += 1

            if (retries > 5) {
                debug(`Max retries of 5 exceeding: ${retries} times tried`)
                return setTimeout(refreshProvider, 5000)
            }
        } else {
            debug(`Reconnecting web3 provider ${config.eth.provider}`)
            refreshProvider(web3Obj, providerUrl)
        }

        return null
    }

    const provider = new Web3.providers.WebsocketProvider(providerUrl)

    provider.on('end', () => retry())
    provider.on('error', () => retry())

    web3Obj.setProvider(provider)

    debug('New Web3 provider initiated')

    return provider
}