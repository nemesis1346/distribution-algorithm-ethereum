'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const winston = require('winston');
const TraderModel = require('../models/traderModel.js');
const TokenAccountModel = require('../models/tokenAccountModel.js');
const IdCard = require('composer-common').IdCard;
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const LOG = winston.loggers.get('application');
const UUID = require('uuid/v1');
const DataModel = require('../models/dataModel.js');
const AgreementModel = require('../models/agreementModel.js');
const PaymentReceiptModel = require('../models/paymentReceiptModel.js');

class AgreementChaincode {
    constructor() {
    }

    /**
   * @description It gets the transactions earned
   * @return {Promise} A promise that gets all the trnascations that were reaned to the current trader
   */
    async getEarnedDistTransactionsByTraderAndISRC(request) {

        let dataModel = new DataModel(null, null, null);
        let transactionList = [];
        console.log('************************************');
        console.log('Get getEarnedDistTransactionsByTraderAndISRC in Composer.js: ');
        console.log(request);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            //Request
            let isrc = request.isrc;
            let traderId = request.traderId;
            await businessNetworkConnection.connect(cardname)
            let query = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.PaymentReceipt WHERE (isrc == _$inputIsrc AND traderReceiverId == _$inputTraderReceiverId AND paymentReceiptStatus == _$inputStatus AND paymentReceiptType == _$inputType)');
            let transactions = await businessNetworkConnection.query(query, { inputIsrc: isrc, inputTraderReceiverId: traderId, inputStatus: 'EARNED', inputType: 'TRACK_UPLOAD' });

            if (transactions && transactions.length > 0) {
                transactions.forEach(element => {
                    let currentReceipt = new PaymentReceiptModel(
                        element.paymentReceiptId,
                        element.isrc,
                        element.ammount,
                        element.traderEmiterId,
                        element.traderReceiverId,
                        element.paymentReceiptType,
                        element.agreementId,
                        element.paymentReceiptStatus,
                        element.traderEmiterName,
                        element.traderRceiverName,
                        element.datetime,
                        element.uploaderId,
                        element.percentageReceiver
                    );
                    transactionList.push(currentReceipt);
                });

                dataModel.data = JSON.stringify(transactionList);
                dataModel.status = '200';
                return dataModel;
            } else {
                dataModel.message = 'There are not receipts';
                dataModel.status = '300';
                return dataModel;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    /**
    * @description It is useful to remove agreements if needed
    * @returns {Promise} a promise that is the confirmation of the removal of the agreement
    * @param {agreementId} 
    */
    async removeAgreement(agreementId) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Remove Agreement in Composer.js: ');
        console.log(agreementId);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname);
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Agreement');
            await assetRegistry.remove(agreementId);
            dataModel.message = JSON.stringify("Agreement removed...");
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log('ERROR IN TRANSACTION CHAINCODE');
            console.log(error);
            throw new Error(error);
        }
    }

    /**
  * @description It creates a new agreement, it goes to the transaction file 
  * The Agreement has the trackId, the traderEmiterId, and the traderReceiverId
  * @return {Promise} A promise that creates an agreement
  * @param {isrc}
  * @param {traderEmiterId}
  * @param {traderReceiverId}
  * @param {agreementId}
  * @param {percentage}
  * @param {status}
  */
    async createAgreement(requestAgreement) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Create Agreement in Composer.js: ');
        console.log(requestAgreement);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            // let businessNetworkDefinition = new BusinessNetworkDefinition();
            let connection = await businessNetworkConnection.connect(cardname);
            let factory = connection.getFactory();
            let shareTotal = 1;
            let trackAssetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');
            let existsAsset = await trackAssetRegistry.exists(requestAgreement.isrc);
            console.log("ISRC: " + requestAgreement.isrc);
            console.log("true?:" + existsAsset);
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let agreementAssetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Agreement');
            if (existsAsset) {

                //We check if the emiter exists
                let existsTraderEmiter = await participantRegistry.exists(requestAgreement.traderEmiterId);
                if (existsTraderEmiter) {
                    console.log("Trader emiter: " + requestAgreement.traderEmiterId + " exists...");
                } else {
                    throw new Error("Trader emiter: " + requestAgreement.traderEmiterId + " doesnt exist...");
                }
                let existsTraderReceiver = await participantRegistry.exists(requestAgreement.traderReceiverId);
                if (existsTraderReceiver) {
                    console.log("Trader receiver: " + requestAgreement.traderReceiverId + " exists...");
                } else {
                    throw new Error("Trader receiver: " + requestAgreement.traderReceiverId + " doesnt exist...");
                }
                console.log("Track: " + requestAgreement.isrc + " exists...");
                console.log("AFREEMENT PROCESSING: ************************");

                //We check previous agreements where the emiter is the same
                let agreementQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.Agreement WHERE (isrc==_$inputIsrc AND traderEmiterId==_$inputTraderEmiterId)');
                let agreements = await businessNetworkConnection.query(agreementQuery, { inputIsrc:  requestAgreement.isrc, inputTraderEmiterId: requestAgreement.traderEmiterId });
                console.log('TOTAL NUMBER OF AGREEMENTS WITH OTHER PARTICIPANTS---------------------');
                console.log(agreements.length);

                shareTotal = parseFloat(shareTotal) - parseFloat(requestAgreement.percentage);

                if (agreements && agreements.length > 0) {
                    for (const element of agreements) {

                        //We first evaluate share percentage max 
                        shareTotal = parseFloat(shareTotal) - parseFloat(element.percentage);
                        if (shareTotal < 0) {
                            console.log('Failed max percentage');
                            dataModel.message = JSON.stringify("Total percentage exceded permited share");
                            dataModel.status = '300';
                            return dataModel;
                        } else {
                            let agreement = factory.newResource(networkNamespace, "Agreement", requestAgreement.agreementId);
                            agreement.agreementId = requestAgreement.agreementId;
                            agreement.traderEmiterId = requestAgreement.traderEmiterId;
                            agreement.traderReceiverId = requestAgreement.traderReceiverId;
                            agreement.percentage = Number(requestAgreement.percentage);
                            agreement.status = requestAgreement.status;
                            agreement.isrc = requestAgreement.isrc;
                            agreement.traderEmiterName = requestAgreement.traderEmiterName;
                            agreement.traderReceiverName = requestAgreement.traderReceiverName;

                            await agreementAssetRegistry.add(agreement);

                            dataModel.data = JSON.stringify("Agreement Created Correctly");
                            dataModel.status = '200';

                            return dataModel;
                        }
                    }
                }else {
                    let agreement = factory.newResource(networkNamespace, "Agreement", requestAgreement.agreementId);
                    agreement.agreementId = requestAgreement.agreementId;
                    agreement.traderEmiterId = requestAgreement.traderEmiterId;
                    agreement.traderReceiverId = requestAgreement.traderReceiverId;
                    agreement.percentage = Number(requestAgreement.percentage);
                    agreement.status = requestAgreement.status;
                    agreement.isrc = requestAgreement.isrc;
                    agreement.traderEmiterName = requestAgreement.traderEmiterName;
                    agreement.traderReceiverName = requestAgreement.traderReceiverName;

                    await agreementAssetRegistry.add(agreement);

                    dataModel.data = JSON.stringify("Agreement Created Correctly");
                    dataModel.status = '200';

                    return dataModel;
                }
            } else {
                throw new Error("Track: " + requestAgreement.isrc + " doesnt exist...");
            }

        } catch (error) {
            console.log('ERROR IN AGREEMENT CREATION');
            console.log(error);
            throw new Error(error);
        }
    }
    /**
        * @description It gets the agreements by that are related with a track
        * @return {Promise} A promise that gets the agreement of a track
        * @param {isrc}
        */
    async getAgreementByTrack(isrc) {
        let dataModel = new DataModel(null, null, null);
        let agreementList = [];
        console.log('************************************');
        console.log('Get Agreements by Track in Composer.js: ');
        console.log(isrc);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            connection.getFactory();

            let agreementQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.Agreement WHERE (isrc==_$isrc)');
            let agreements = await businessNetworkConnection.query(agreementQuery, { isrc: isrc });

            if (agreements && agreements.length > 0) {

                agreements.forEach(async function (element) {
                    console.log('Agreement: ************************');
                    console.log("AgreementId: " + element.agreementId);
                    console.log("EmiderId: " + element.traderEmiterId);
                    console.log("ReceiverId: " + element.traderReceiverId);
                    console.log("Status: " + element.status);

                    let currentAgreement = new AgreementModel(
                        element.agreementId,
                        element.traderEmiterId,
                        element.traderReceiverId,
                        element.percentage,
                        element.status,
                        element.isrc,
                        element.traderEmiterName,
                        element.traderReceiverName
                    );
                    agreementList.push(currentAgreement);
                });

                dataModel.data = JSON.stringify(agreementList);
                dataModel.status = '200';

                return dataModel;
            } else {
                dataModel.message = 'There were no previous agreements to distribute';
                dataModel.status = '300';

                return dataModel;
            }
        } catch (error) {
            console.log('ERROR IN GET AGREEMENTS BY TRACKS');
            console.log(error);
            throw new Error(error);
        }
    }
    /**
           * @description It gets all the agreements
           * @return {Promise} A promise that gets a list of agreements
           * @param {isrc}
           */
    async getAgreements() {
        let dataModel = new DataModel(null, null, null);
        let agreementList = [];
        console.log('************************************');
        console.log('Get Agreements in Composer.js: ');
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            connection.getFactory();

            let agreementRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Agreement');
            let agreements = await agreementRegistry.getAll();

            if (agreements && agreements.length > 0) {

                agreements.forEach(async function (element) {
                    let currentAgreement = new AgreementModel(
                        element.agreementId,
                        element.traderEmiterId,
                        element.traderReceiverId,
                        element.percentage,
                        element.status,
                        element.isrc,
                        element.traderEmiterName,
                        element.traderReceiverName
                    );
                    agreementList.push(currentAgreement);
                });

                dataModel.data = JSON.stringify(agreementList);
                dataModel.status = '200';

                return dataModel;
            } else {
                dataModel.message = 'There were no previous agreements';
                dataModel.status = '300';

                return dataModel;
            }
        } catch (error) {
            console.log('ERROR IN GET AGREEMENTS BY TRACKS');
            console.log(error);
            throw new Error(error);
        }
    }

}
module.exports = AgreementChaincode;