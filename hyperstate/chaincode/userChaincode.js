'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const UserModel = require('../models/userModel.js');
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const DataModel = require('../models/dataModel.js');
  
class UserChaincode {
    constructor() {
    }

  /**
     * @description It authenticates a participant by the username and password with queries
     * @return {Promise} A promise that authenticates user
     * @param {email}
     * @param {pwd}
     */
    async login(requestOrganization) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Login in Composer.js: ');
        console.log(requestOrganization);
        try {

            let businessNetworkConnection = new BusinessNetworkConnection();
            //Request
            let email = requestOrganization.email;
            let pwd = requestOrganization.pwd;
            await businessNetworkConnection.connect(cardname)
            let query = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.Organization WHERE (email==_$email AND pwd==_$pwd)');
            let organizationQuery = await businessNetworkConnection.query(query, { email: email, pwd: pwd });

            if (organizationQuery[0] && organizationQuery[0].email) {

                let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Organization');
                console.log('identifier');
                console.log(organizationQuery[0].$identifier);
                let organizationResult = await participantRegistry.get(organizationQuery[0].$identifier);
                console.log('last organization result');
                //console.log(organizationResult);
                let result = new UserModel(
                    organizationResult.name,
                    organizationResult.email,
                    organizationResult.pwd,
                    organizationResult.organizationType,
                    (organizationResult.traderId) ? organizationResult.traderId : ""
                );

                dataModel.data = JSON.stringify(result);
                dataModel.status = '200';

                return dataModel;
            } else {
                dataModel.message = 'Organization with email ' + email + ' doesnt exist';
                dataModel.status = '300';

                return dataModel;
            }

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = UserChaincode;