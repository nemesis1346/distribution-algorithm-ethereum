'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const winston = require('winston');
const TraderModel = require('../models/traderModel.js');
const TokenAccountModel = require('../models/tokenAccountModel.js');
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const LOG = winston.loggers.get('application');
const DataModel = require('../models/dataModel.js');

class TraderChaincode {
    constructor() {
    }

    /** 
     * @description Initalizes the Hyperstate Network by making a connection to the Composer runtime. Could be for ping?
     * @return {Promise} A promise whose fullfillment means the initialization has completed
     */
    async init() {
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardname);
        console.log(this.businessNetworkDefinition);
        LOG.info('Hyperstate:<init>', 'businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier());
    }
    //This method is being used in the creation of trader
    /**
     * @description It creates a new token account 
     * @param {TokenAccountModel} the input is a tokenAccountModel
     * @return {Promise}  
     */
    async createNewTokenAccount(requestCreateTokenAccount) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Token Account in Composer.js: ');
        console.log(requestCreateTokenAccount);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname)
            let tokenRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.TokenAccount');
            let factory = connection.getFactory();

            //here the concept must be registered
            let tokenAccount = factory.newResource(networkNamespace, "TokenAccount", requestCreateTokenAccount);
            tokenAccount.tokenAccountId = requestCreateTokenAccount;

            await tokenRegistry.add(tokenAccount);
            // await businessNetworkConnection.disconnect();

            dataModel.data = JSON.stringify('Token Account ' + tokenAccount.tokenAccountId + 'added succesfully in Chaincode: ');
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * @description It creates a new trader entity
     * @return {Promise} It will create a new trader  
     */
    async createTrader(requestTrader) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Create Trader in Composer.js: ');
        console.log(requestTrader);
        try {
            let currentTraderModel = new TraderModel(
                requestTrader.traderId,
                requestTrader.name,
                requestTrader.email,
                requestTrader.balance,
                requestTrader.traderType,
                requestTrader.tokenAccountId,
            );
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname)
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let factory = connection.getFactory();
            let participant = factory.newResource(networkNamespace, "Trader", currentTraderModel.traderId);
            participant.traderId = currentTraderModel.traderId;
            participant.name = currentTraderModel.name;
            participant.email = currentTraderModel.email;
            participant.balance = currentTraderModel.balance;
            participant.traderType = currentTraderModel.traderType;
            participant.tokenAccountId = currentTraderModel.tokenAccountId;
            await participantRegistry.add(participant);

            //await businessNetworkConnection.disconnect();
            dataModel.data = JSON.stringify('Participant ' + participant.traderId + ' added succesfully in Chaincode: ');
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * @description It gets all the trades
     * @return {promise} A promise that gets a list of all the traders
     */
    async getTraders() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Get Traders in Composer.js: ');
        try {
            let traderList = [];
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let traders = await participantRegistry.getAll();
            traders.forEach(element => {

                let currentTrader = new TraderModel(
                    element.traderId,
                    element.name,
                    element.email,
                    element.balance,
                    element.traderType,
                    element.tokenAccountId,
                );
                traderList.push(currentTrader);
            });
            //console.log(traders);
            dataModel.data = JSON.stringify(traderList);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /** 
     * @description It gets the detail of an specific trader
     * @return {Promise} A promise that returns the detail of an specific trader
     */
    async getTraderDetail(traderId) {
        let dataModel = new DataModel(null, null, null);
        console.log('*******************************');
        console.log("Request Trader Detail in Composer.js: ");
        console.log(traderId);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname);
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let trader = await participantRegistry.get(traderId);

            dataModel.data = JSON.stringify(trader);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * @description It gets an specific token account
     * @return {Promise} A promise that returns an object which is a token account
     * 
     */
    async getTokenAccountDetail(tokenAccountId) {
        let dataModel = new DataModel(null, null, null);
        console.log('*******************************');
        console.log('Token Account Id Request: ');
        console.log(tokenAccountId);
        try {

            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.TokenAccount');
            let tokenAccount = await assetRegistry.get(tokenAccountId);

            dataModel.data = JSON.stringify(tokenAccount);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}
module.exports = TraderChaincode;