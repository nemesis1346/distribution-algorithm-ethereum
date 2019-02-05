'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const winston = require('winston');
const UserModel = require('../../models/userModel.js');
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const LOG = winston.loggers.get('application');
const UUID = require('uuid/v1');
const DataModel = require('../../models/dataModel.js');
const TrackModel = require('../../models/trackModel.js');

class TransactionChaincode {

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

   /**
    * @description It creates a new track
    * @return {Promise} A promise that creates a track
    */
   async createTrack(request) {
    let dataModel = new DataModel(null, null, null);
    console.log('************************************');
    console.log('Request Track in Composer.js: ');
    console.log(request);
    //let requestTrack= JSON.parse(request);
    let requestTrack=request;
    try {
        let currentTrack = new TrackModel(
            requestTrack.isrc,
            requestTrack.title,
            requestTrack.revenueTotal,
            requestTrack.vendorIdentifier,
            requestTrack.label,
            requestTrack.author,
            requestTrack.ownerType,
            requestTrack.uploaderId
        );

        let businessNetworkConnection = new BusinessNetworkConnection();
        let connection = await businessNetworkConnection.connect(cardname)
        let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');
        let factory = connection.getFactory();

        let track = factory.newResource(networkNamespace, "Track", currentTrack.isrc);
        track.isrc = currentTrack.isrc;
        track.title = currentTrack.title;
        track.revenueTotal = parseFloat(currentTrack.revenueTotal);
        track.vendorIdentifier = currentTrack.vendorIdentifier;
        track.label = currentTrack.label;
        track.author = currentTrack.author;
        track.ownerType = currentTrack.ownerType;
        track.uploaderId = currentTrack.uploaderId;

        await assetRegistry.add(track);
        console.log('Track added succesfully in Chaincode: ');
        console.log(track.isrc);
        track.title=UUID();
        await assetRegistry.update(track);
        //await businessNetworkConnection.disconnect();
        
        dataModel.data = JSON.stringify(currentTrack);
        dataModel.status = '200';

        return dataModel;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
}
module.exports = TransactionChaincode;
