'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const winston = require('winston');
const TrackModel = require('../models/trackModel.js');
const IdCard = require('composer-common').IdCard;
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const LOG = winston.loggers.get('application');
const UUID = require('uuid/v1');
const DataModel = require('../models/dataModel.js');

class TrackChaincode {
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
     * @description This is a method for updating properties of the track
     * @return {Promise} A promise that returns the confirmation of the updated Track
     */
    async updateTrack(updateTrackRequest){
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Update Track in Composer.js: ');
        console.log(updateTrackRequest);
        try {
           // let request=JSON.parse(updateTrackRequest);
            let isrc = updateTrackRequest.isrc;
            let revenueTotal = updateTrackRequest.revenueTotal;
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');

            let track = await assetRegistry.get(isrc);
            track.revenueTotal = parseFloat(revenueTotal);

            await assetRegistry.update(track);
            dataModel.data = JSON.stringify(track);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /** 
     * @description It gets the detail of an specific track
     * @return {Promise} A promise that returns the detail of an specific track
     */
    async getTrackDetail(isrc) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Get Track Detail in Composer.js: ');
        console.log(isrc);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');

            let track = await assetRegistry.get(isrc);
            dataModel.data = JSON.stringify(track);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /** 
    * @description It gets a list of track
    * @return {Promise} A promise that return a list of tracks
    */
    async getTracks() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Get Tracks in Composer.js: ');
        try {
            let trackList = [];
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');
            let tracks = await assetRegistry.getAll();
            //TODO: Fix the track list
            let factory = connection.getFactory();
            let serializer = connection.getSerializer();
            tracks.forEach(element => {
                console.log('Track element: ');
                console.log(element.isrc);
                //TODO: deal with track shares
                let currentTrack = new TrackModel(
                    element.isrc,
                    element.title,
                    element.revenueTotal,
                    element.vendorIdentifier,
                    element.label,
                    element.author,
                    element.ownerType,
                    (element.uploaderId) ? (element.uploaderId) : "",
                );
                console.log('GETS HERE-------------------------------');
                trackList.push(currentTrack);
            });

            dataModel.data = JSON.stringify(trackList);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
    * @description It creates a new track
    * @return {Promise} A promise that creates a track
    */
    async createTrack(requestTrack) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Track in Composer.js: ');
        console.log(requestTrack);
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
            let connection = await businessNetworkConnection.connect(cardname);
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
            let creationTrack=await assetRegistry.add(track);
            await assetRegistry.resolve(track.isrc);
           // debugger;
            console.log(creationTrack);
            console.log('Track added succesfully in Chaincode: ');
            console.log(track.isrc);
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
module.exports = TrackChaincode;