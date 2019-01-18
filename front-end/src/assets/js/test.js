'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const Table = require('cli-table');
const winston = require('winston');
const prettyjson = require('prettyjson');

// these are the credentials to use to connect to the Hyperledger Fabric
let cardname = 'admin@digitalproperty-network';

const LOG = winston.loggers.get('application');

var testJS="hola";

/** Class for the land registry*/
class LandRegistry {

   /**
    * Need to have the mapping from bizNetwork name to the URLs to connect to.
    * bizNetwork nawme will be able to be used by Composer to get the suitable model files.
    *
    */
    constructor() {
        this.bizNetworkConnection = new BusinessNetworkConnection();
    }

   /** 
    * @description Initalizes the LandRegsitry by making a connection to the Composer runtime
    * @return {Promise} A promise whose fullfillment means the initialization has completed
    */
    async init() {
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardname);
        LOG.info('LandRegistry:<init>', 'businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier());
    }
}
module.exports = LandRegistry;
