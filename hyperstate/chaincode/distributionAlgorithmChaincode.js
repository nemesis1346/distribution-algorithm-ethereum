'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const winston = require('winston');
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const LOG = winston.loggers.get('application');
const UUID = require('uuid/v1');
const DataModel = require('../models/dataModel.js');
const EvaluateReceiversRequest = require('../models/evaluateReceiversRequest.js');
const ReceiverShareModel = require('../models/receiverShareModel.js');
const OnHoldDistributionRequest = require('../models/onHoldDistributionRequest.js');
const DistributionProcessRequest = require('../models/distributionProcessRequest.js');
const EvaluateReceiptRequest = require('../models/evaluateReceiptRequest.js');
const DistributionLastNodeRequest = require('../models/distributionLastNodeRequest.js');

class DistributionAlgorithmChaincode {
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
    async distribution(requestDistribution) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Distribution in Composer.js: ');
        console.log(requestDistribution);
        try {
            let isrc = requestDistribution.isrc;
            let uploaderId = requestDistribution.uploaderId;
            let datetime = requestDistribution.datetime;

            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname);

            let trackRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');
            let track = await trackRegistry.get(isrc);
            let revenueTotalInput = track.revenueTotal;//TODO: this could be subject to change maybe should just be an ammountS

            let evaluateReceiversFirstTimeRequest = new EvaluateReceiversRequest(isrc, uploaderId, revenueTotalInput, datetime, 'none', 'none',uploaderId);
            let evaluateReceiversFirstTimeResult = await this.evaluateReceivers(JSON.stringify(evaluateReceiversFirstTimeRequest));
            console.log(evaluateReceiversFirstTimeResult);
            //TODO: data model in case of max percentage
            let receiverShareFirstTimeList = await JSON.parse(evaluateReceiversFirstTimeResult.data);
            console.log('RESULT RECEIVERS SHARE FIRST TIME');
            console.log(receiverShareFirstTimeList);

            if (receiverShareFirstTimeList.length == 0) {
                //This is just the first time
                let onHoldDistributionRequest = new OnHoldDistributionRequest(isrc, uploaderId, datetime, revenueTotalInput);
                await this.onHoldDistribution(JSON.stringify(onHoldDistributionRequest));
            } else if (receiverShareFirstTimeList.length >= 1) {
                for (const element of receiverShareFirstTimeList) {
                    let distributionProcessRequest = new DistributionProcessRequest(
                        isrc,
                        element.traderReceiverId,
                        datetime,
                        element.ammount,
                        JSON.stringify([{ "traderEmiterId": uploaderId }]),
                        element.percentageReceiver,
                        element.agreementId,
                        uploaderId);
                    await this.distributionProcess(JSON.stringify(distributionProcessRequest));
                }
            }
            dataModel.data = JSON.stringify("Process finished");
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log('ERROR IN TRANSACTION CHAINCODE');
            console.log(error);
            throw new Error(error);
        }
    }

    async distributionProcess(requestDistributionProcess) {
        console.log('************************************');
        console.log('Request Distribution Process in Composer.js: ');
        console.log(requestDistributionProcess);
        try {
            let request = JSON.parse(requestDistributionProcess);
            let isrc = request.isrc;
            let previousAgreementId = request.previousAgreementId;
            let emiterId = request.emiterId;
            let datetime = request.datetime;
            let shareAmmount = request.shareAmmount; //maybe is not required
            let previousEmitersArray = request.previousEmitersArray;
            let uploaderId = request.uploaderId;
            console.log('PREVIOUS EMITERS');
            console.log(previousEmitersArray);
            if (previousEmitersArray == "" || previousEmitersArray == null) {
                previousEmitersArray = [];
            } else {
                previousEmitersArray = JSON.parse(request.previousEmitersArray);
            }
            let percentageReceiver = request.percentageReceiver;

            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname);

            let evaluateReceiverRequest = new EvaluateReceiversRequest(
                isrc,
                 emiterId, 
                 shareAmmount, 
                 datetime, 
                 previousEmitersArray[0].traderEmiterId,  //TODO: THIS MUST BE A LOOP IN THE FUTURE
                 previousAgreementId,
                 uploaderId);

            let evaluateReceiversPostResult = await this.evaluateReceivers(JSON.stringify(evaluateReceiverRequest));
            console.log(evaluateReceiversPostResult);
            //TODO: data model in case of max percentage
            let receiverShareList = await JSON.parse(evaluateReceiversPostResult.data);
            console.log('RESULT RECEIVERS SHARE');
            console.log(receiverShareList);

            //TODO: In list equal to 0, there must be a respose with the info of the previous emiter 
            if (receiverShareList.length == 0) {
                let distributionLastNodeRequest = new DistributionLastNodeRequest(
                    JSON.stringify(previousEmitersArray),
                    emiterId,
                    percentageReceiver,
                    shareAmmount, isrc,
                    datetime,
                    uploaderId);
                await this.distributionLastNode(JSON.stringify(distributionLastNodeRequest));
            } else if (receiverShareList.length == 1) {
                let uniqueShare = receiverShareList[0];
                //First we evaluate the receipt backwards 
                let receiptsBackward = 0;
                for (const element of previousEmitersArray) {
                    let evaluateReceiptRequestBackward = new EvaluateReceiptRequest(
                        uniqueShare.agreementId,
                        element.traderEmiterId,
                        uniqueShare.traderEmiterId,
                        isrc,
                        datetime);
                    receiptsBackward += await this.evaluateReceipt(JSON.stringify(evaluateReceiptRequestBackward));
                }
                //Now we evaluate the receipt forward 
                let receiptsForward = 0;
                let evaluateReceiptRequestForward = new EvaluateReceiptRequest(
                    uniqueShare.agreementId,
                    uniqueShare.traderEmiterId,
                    uniqueShare.traderReceiverId,
                    isrc,
                    datetime);
                receiptsForward += await this.evaluateReceipt(JSON.stringify(evaluateReceiptRequestForward));

                if (!((receiptsBackward + receiptsForward) > 1)) {
                    //Now we make the distribution for the following unique receiver

                    let distributionProcessRequest = new DistributionProcessRequest(
                        isrc,
                        uniqueShare.traderReceiverId,
                        datetime, 
                        uniqueShare.ammount,
                        JSON.stringify([{ "traderEmiterId": uniqueShare.traderEmiterId }]),
                        uniqueShare.percentageReceiver,
                        uniqueShare.agreementId,
                        uploaderId);
                    await this.distributionProcess(JSON.stringify(distributionProcessRequest));
                } else {
                    console.log('NODE FINISHED*********************************')
                }
            } else if (receiverShareList.length > 1) {
                let uniqueShare = receiverShareList[0];
                for (const element of receiverShareList) {
                    let distributionProcessRequest = new DistributionProcessRequest(
                        isrc,
                        element.traderReceiverId,
                        datetime,
                        element.ammount,
                        JSON.stringify([{ "traderEmiterId": uniqueShare.traderEmiterId }]), //TODO: THIS MUST BE A LOOP IN THE FUTURE  
                        element.percentageReceiver,
                        element.agreementId,
                        uploaderId);
                    await this.distributionProcess(JSON.stringify(distributionProcessRequest));
                }
            }
        } catch (error) {
            console.log('ERROR IN TRANSACTION DISTRIBUTION PROCESS');
            console.log(error);
            throw new Error(error);
        }
    }

    async distributionLastNode(distributionLastNodeRequest) {
        console.log('************************************');
        console.log('Distribution Last Node in Composer.js: ');
        console.log(distributionLastNodeRequest);
        try {
            let request = JSON.parse(distributionLastNodeRequest);

            let emiterList = JSON.parse(request.listEmiters);
            let emiterId = emiterList[0].traderEmiterId;
            let isrc = request.isrc;
            let receiverId = request.traderReceiverId;
            let percentageReceiver = request.percentageReceiver;
            let ammount = request.ammount;
            let datetime = request.datetime;
            let uploaderId=request.uploaderId;

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let factory = connection.getFactory();

            let receiptRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.PaymentReceipt');
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let tokenRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.TokenAccount');

            let receiver = await participantRegistry.get(receiverId);
            let emiter = await participantRegistry.get(emiterId);
            let tokenAccountReceiver = await tokenRegistry.get(receiver.tokenAccountId);

            //Select the agreement where the emiter is the last receiver
            let agreementQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.Agreement WHERE (isrc==_$inputIsrc AND traderEmiterId==_$inputEmiterId AND traderReceiverId==_$inputReceiverId)');
            let agreementResult = await businessNetworkConnection.query(agreementQuery, { inputIsrc: isrc, inputEmiterId: emiterId, inputReceiverId: receiverId });

            console.log('DEBUGGING');
            console.log(emiterId);
            console.log(receiverId);
            console.log(agreementResult);
            if (agreementResult && agreementResult.length > 0) {
                let uniqueAgreement = agreementResult[0];
                console.log('*********************LAST NODE DISTRIBUTION************************');
                console.log("AgreementId: " + uniqueAgreement.agreementId);
                console.log("EmiterName: " + emiter.name);
                console.log("ReceiverName: " + receiver.name);

                let serviceFee = parseFloat(percentageReceiver);
                //let ammountToAddReceiver = serviceFee * parseFloat(ammount);
                let ammountToAddReceiver = ammount;
                console.log('Share Ammount: ****************');
                console.log(ammount);
                console.log('Service Fee of Receiver: ********************');
                console.log(serviceFee);
                console.log('Ammount to Reduce to Emitter and add to Receiver' + emiter.name + ': ******************');
                console.log(ammountToAddReceiver);

                console.log('PREVIOUS STATE***********************************');
                console.log('Trader Receiver Name: ' + receiver.name);
                console.log('Trader Receiver BalanceAccountId: ' + tokenAccountReceiver.tokenAccountId);
                console.log("Trader Receiver Balance Enabled: " + tokenAccountReceiver.balanceEnabled);

                tokenAccountReceiver.balanceEnabled = parseFloat(tokenAccountReceiver.balanceEnabled) + parseFloat(ammountToAddReceiver);
                console.log('UPDATE*********************************************');
                console.log('Trader Receiver new Balance Enabled: ' + tokenAccountReceiver.balanceEnabled);

                console.log("//////////////////////////////////////");

                await tokenRegistry.update(tokenAccountReceiver);

                //Now we submit the transactions that happened in this event
                let currentReceiptId = UUID();
                let currentPaymentTransaction = factory.newResource(networkNamespace, "PaymentReceipt", currentReceiptId);
                currentPaymentTransaction.isrc = isrc;
                currentPaymentTransaction.ammount = ammountToAddReceiver;
                currentPaymentTransaction.traderEmiterId = emiter.traderId;
                currentPaymentTransaction.traderReceiverId = receiver.traderId;
                currentPaymentTransaction.paymentReceiptType = 'DISTRIBUTION';
                currentPaymentTransaction.agreementId = uniqueAgreement.agreementId;
                currentPaymentTransaction.paymentReceiptStatus = "EARNED";
                currentPaymentTransaction.paymentReceiptId = currentReceiptId;
                currentPaymentTransaction.traderEmiterName = emiter.name;
                currentPaymentTransaction.traderReceiverName = receiver.name;
                currentPaymentTransaction.datetime = datetime;//TODO: see if its necessary
                currentPaymentTransaction.uploaderId=uploaderId;
                currentPaymentTransaction.percentageReceiver = percentageReceiver;

                await receiptRegistry.add(currentPaymentTransaction);
                console.log('NODE FINISHED*********************************')
            }
        } catch (error) {
            console.log('ERROR IN TRANSACTION EVALUATE RECEIPT');
            console.log(error);
            throw new Error(error);
        }
    }

    async evaluateReceipt(evaluateReceiptRequest) {
        console.log('************************************');
        console.log('Evaluate Receipt in Composer.js: ');
        console.log(evaluateReceiptRequest);
        try {
            let lengthResult = 0;
            let request = JSON.parse(evaluateReceiptRequest);
            let agreementId = request.agreementId;
            let traderEmiterId = request.traderEmiterId;
            let traderReceiverId = request.traderReceiverId;
            let isrc = request.isrc;
            let datetime = request.datetime;

            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname);

            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');

            let receiver = await participantRegistry.get(traderReceiverId);
            let emiter = await participantRegistry.get(traderEmiterId);

            let evaluateReceiptQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.PaymentReceipt WHERE (agreementId==_$inputAgreementId AND paymentReceiptType==_$inputType AND paymentReceiptStatus==_$inputStatus AND traderReceiverId==_$inputReceiverId AND traderEmiterId==_$inputEmiterId AND isrc==_$inputIsrc AND datetime==_$inputDatetime)');
            let evaluateReceiptResult = await businessNetworkConnection.query(evaluateReceiptQuery, { inputAgreementId: agreementId, inputType: 'DISTRIBUTION', inputStatus: 'EARNED', inputReceiverId: traderReceiverId, inputEmiterId: traderEmiterId, inputIsrc: isrc, inputDatetime: datetime });

            if (evaluateReceiptResult.length > 0) {
                console.log('********************EXIST RECEIPTS********************');
                console.log('Emiter Name: ' + emiter.name);
                console.log('Receiver Name: ' + receiver.name);
                lengthResult += evaluateReceiptResult;
                return lengthResult;
            } else {
                return lengthResult;
            }
        } catch (error) {
            console.log('ERROR IN TRANSACTION EVALUATE RECEIPT');
            console.log(error);
            throw new Error(error);
        }
    }

    /**
    * @description It submits an automatic payment distribution. It must be called each time a song is uploaded. 
    * Its for simple one channel cascade distribution
    * @return {Promise} A promise the confirmation of the automatic distribution
    * @param {isrc}
    * @param {uploaderId}
    */
    async onHoldDistribution(onHoldDistributionRequest) {
        console.log('************************************');
        console.log('Request On Hold Distribution in Composer.js: ');
        console.log(onHoldDistributionRequest);
        try {
            let request = JSON.parse(onHoldDistributionRequest);
            let isrc = request.isrc;
            let uploaderId = request.uploaderId;
            let datetime = request.datetime;
            let shareAmmount = request.ammount;

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let factory = connection.getFactory();

            let receiptRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.PaymentReceipt');
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let tokenRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.TokenAccount');

            let uploader = await participantRegistry.get(uploaderId);

            let tokenAccountUploader = await tokenRegistry.get(uploader.tokenAccountId);
            tokenAccountUploader.balanceDisabled = parseFloat(tokenAccountUploader.balanceDisabled) + parseFloat(shareAmmount);
            await tokenRegistry.update(tokenAccountUploader);

            let inputTraderRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let inputTrader = await inputTraderRegistry.get(uploaderId);

            console.log('***************ON HOLD DISTRIBUTION***********************');
            console.log('Trader Emitter Updated************************************');
            console.log(inputTrader.name + " Token Disabled: " + tokenAccountUploader.balanceDisabled);
            console.log("//////////////////////////////////////");

            //Now we submit the transactions that happened in this event
            let fullReceiptId = UUID();
            let fullPaymentTransaction = factory.newResource(networkNamespace, "PaymentReceipt", fullReceiptId);
            fullPaymentTransaction.isrc = isrc;
            fullPaymentTransaction.ammount = shareAmmount;
            fullPaymentTransaction.traderEmiterId = "none";
            fullPaymentTransaction.traderReceiverId = uploaderId;
            fullPaymentTransaction.paymentReceiptType = 'TRACK_UPLOAD';
            fullPaymentTransaction.agreementId = isrc; //TODO: check what is this useful for
            fullPaymentTransaction.paymentReceiptStatus = "EARNED";
            fullPaymentTransaction.paymentReceiptId = fullReceiptId;
            fullPaymentTransaction.traderEmiterName = "none";
            fullPaymentTransaction.traderReceiverName = inputTrader.name;
            fullPaymentTransaction.datetime = datetime;
            fullPaymentTransaction.uploaderId=uploaderId;
            fullPaymentTransaction.percentageReceiver = 1.00;
            await receiptRegistry.add(fullPaymentTransaction);

            return "ON HOLD DISTRIBUTION SUCCESSFUL";
        } catch (error) {
            console.log('ERROR IN TRANSACTION ON HOLD DISTRIBUTION');
            console.log(error);
            return false;
        }
    }
    /**
        * @description This method is one part of the generic overall algorithm for distribution
        * @param {EvaluateReceiverRequest} evaluateReceiverRequest 
        */
    async evaluateReceivers(evaluateReceiverRequest) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Evaluate Receivers in Composer.js: ');
        console.log(evaluateReceiverRequest);
        let request = JSON.parse(evaluateReceiverRequest);
        try {
            let receiverShareListResult = [];
            let shareTotal = 1;

            let isrc = request.isrc;
            let previousReceiverId = request.previousReceiverId;
            let emiterId = request.emiterId;
            let shareAmmount = request.shareAmmount;
            let datetime = request.datetime;
            let previousAgreementId = request.previousAgreementId;
            let uploaderId = request.uploaderId;

            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            let factory = connection.getFactory();

            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let tokenRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.TokenAccount');
            let receiptRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.PaymentReceipt');

            let previousReceiver;
            let previousReceiverName;
            let emiter = await participantRegistry.get(emiterId);
            if (previousReceiverId && previousReceiverId != "none") {
                previousReceiver = await participantRegistry.get(previousReceiverId);
                previousReceiverId = previousReceiver.traderId;
                previousReceiverName = previousReceiver.name;
            } else {
                previousReceiverId = 'none';
                previousReceiverName = 'none';
            }

            let agreementQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.Agreement WHERE (isrc==_$inputIsrc AND traderEmiterId==_$inputTraderEmiterId)');
            let agreements = await businessNetworkConnection.query(agreementQuery, { inputIsrc: isrc, inputTraderEmiterId: emiterId });

            console.log('****************EVALUATE RECEIVERS OF TRADER ' + emiter.name + ' ******************');
            console.log('PREVIOUS RECEIVER------------');
            console.log(previousReceiverName);
            console.log('PREVIOUS RECEIVER ID--------');
            console.log(previousReceiverId);
            console.log('PREVIOUS AGREEMENT ID-----');
            console.log(previousAgreementId);
            console.log('EMITER-----------------------');
            console.log(emiter.name);
            console.log('TOTAL NUMBER OF AGREEMENTS WITH OTHER PARTICIPANTS---------------------');
            console.log(agreements.length);

            if (agreements && agreements.length > 0) {
                for (const element of agreements) {
                    debugger;
                    //We first evaluate share percentage max 
                    shareTotal = parseFloat(shareTotal) - parseFloat(element.percentage);
                    if (shareTotal < 0) {
                        dataModel.message = JSON.stringify("Total percentage exceded permited share");
                        dataModel.status = '300';
                        return dataModel;
                    }

                    let receiverShareAmmount = parseFloat(shareAmmount) * parseFloat(element.percentage);
                    let currentShareModel = new ReceiverShareModel(
                        element.agreementId,
                        element.traderEmiterId,
                        element.traderReceiverId,
                        element.traderEmiterName,
                        element.traderReceiverName,
                        receiverShareAmmount,
                        element.percentageReceiver);
                    receiverShareListResult.push(currentShareModel);
                }
                //Now we make the distribution for the emiter--------------------------------------------
                let uniqueShare = agreements[0];

                let ammountToAddEmiter = parseFloat(shareTotal) * parseFloat(shareAmmount);
                let uniqueShareReceiver = await participantRegistry.get(uniqueShare.traderReceiverId);

                let tokenAccountEmiter = await tokenRegistry.get(emiter.tokenAccountId);
                console.log('PREVIOUS STATE EMITER************************************');
                console.log('Trader Emitter Name: ' + emiter.name);
                console.log('Trader Emitter BalanceAccountId: ' + tokenAccountEmiter.tokenAccountId);
                console.log('Trader Emitter Balance Enabled: ' + tokenAccountEmiter.balanceEnabled);
                console.log('Ammount to Add to Emitter ' + ammountToAddEmiter);
                console.log('Trader Receiver Name: ' + uniqueShareReceiver.name);

                tokenAccountEmiter.balanceEnabled = parseFloat(tokenAccountEmiter.balanceEnabled) + parseFloat(ammountToAddEmiter);
                console.log('UPDATE*********************************************');
                console.log('Trader Emitter Name: ' + emiter.name);
                console.log('Trader Emiter new Balance Enabled: ' + tokenAccountEmiter.balanceEnabled);

                await tokenRegistry.update(tokenAccountEmiter);

                let fullReceiptId = UUID();
                let fullPaymentTransaction = factory.newResource(networkNamespace, "PaymentReceipt", fullReceiptId);
                fullPaymentTransaction.isrc = isrc;
                fullPaymentTransaction.ammount = ammountToAddEmiter;
                fullPaymentTransaction.traderEmiterId = previousReceiverId;
                fullPaymentTransaction.traderReceiverId = emiter.traderId;
                fullPaymentTransaction.paymentReceiptType = 'DISTRIBUTION';
                fullPaymentTransaction.agreementId = previousAgreementId; //TODO: check what is this useful for
                fullPaymentTransaction.paymentReceiptStatus = "EARNED";
                fullPaymentTransaction.paymentReceiptId = fullReceiptId;
                fullPaymentTransaction.traderEmiterName = previousReceiverName;
                fullPaymentTransaction.traderReceiverName = emiter.name;
                fullPaymentTransaction.datetime = datetime;
                fullPaymentTransaction.uploaderId=uploaderId;
                fullPaymentTransaction.percentageReceiver=shareTotal;
                await receiptRegistry.add(fullPaymentTransaction);

            } else {
                console.log('No receivers for this trader: ' + emiter.name);
            }
            dataModel.data = JSON.stringify(receiverShareListResult);
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log('ERROR IN TRANSACTION EVALUATE EMITERS');
            console.log(error);
            throw new Error(error);
        }
    }



}
module.exports = DistributionAlgorithmChaincode;
