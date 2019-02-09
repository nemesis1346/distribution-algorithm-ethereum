
'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const winston = require('winston');
const UserModel = require('../models/userModel.js');
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const LOG = winston.loggers.get('application');
const UUID = require('uuid/v1');
const DataModel = require('../models/dataModel.js');

class OrganizationChaincode {
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
        * @description It creates a new organization entity
        * @return {Promise} A promise that creates a new organization
        */
    async createOrganization(requestOrganization) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log("Request Create Organization in Composer.js: ");
        console.log(requestOrganization);
        try {
            let organizationModel = new UserModel(
                requestOrganization.name,
                requestOrganization.email,
                requestOrganization.pwd,
                requestOrganization.organizationType,
                requestOrganization.traderId);
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname)
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Organization');
            let factory = connection.getFactory();
            
            let organizationId = UUID();
            let participant = factory.newResource(networkNamespace, "Organization", organizationId);
            participant.organizationId = organizationId;
            participant.email = organizationModel.email;
            participant.name = organizationModel.name;
            participant.pwd = organizationModel.pwd;
            participant.organizationType = organizationModel.organizationType;
            participant.traderId = organizationModel.traderId;
            await participantRegistry.add(participant);
            console.log('Organization added succesfully in Chaincode: ');
            console.log(participant.email);

            dataModel.data = JSON.stringify(organizationModel);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.log('ERROR in Create Organization **********************');
            throw new Error(error);
        }
    }


    /**
    * @description It gets a list of organizations
    * @return {Promise} A promise that returns a list of organizations
    */
    async getOrganizations() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log("Request Get Organizations in Composer.js: ");
        try {
            let organizationList = [];
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname)
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Organization');
            let organizations = await participantRegistry.getAll();
            organizations.forEach(element => {
                let currentOrganization = new UserModel(
                    element.email,
                    element.pwd,
                    element.name,
                    element.organizationType,
                    (element.traderId) ? (element.traderId) : ""
                );
                organizationList.push(currentOrganization);
            });

            dataModel.data = JSON.stringify(organizationList);
            dataModel.status = '200';

            return dataModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}
module.exports = OrganizationChaincode;