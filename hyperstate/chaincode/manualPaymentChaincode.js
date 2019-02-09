'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const UUID = require('uuid/v1');
const DataModel = require('../models/dataModel.js');

class ManualPaymentChaincode {
    constructor() {
    }

    /**TODO: THIS METHOD MUST BE IMPROVED SINCE THERE ARE NOT HIERARCHIES ANYMORE
   * @description This is the method for paying manually
   * @return {Promise} returns a confirmation or error
   */
    async manualPayment(request) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Manual Payment in Composer.js: ');
        console.log(request);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            //Request
            let isrc = request.isrc;
            let traderId = request.traderId;
            let connection = await businessNetworkConnection.connect(cardname);
            let query = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.PaymentReceipt WHERE (isrc == _$inputIsrc AND traderReceiverId == _$inputTraderReceiverId AND paymentReceiptStatus == _$inputStatus AND paymentReceiptType == _$inputType)');
            let transactions = await businessNetworkConnection.query(query, { inputIsrc: isrc, inputTraderReceiverId: traderId, inputStatus: 'EARNED', inputType: 'TRACK_UPLOAD' });
            let factory = connection.getFactory();
            let previousAmmountReceiver = 0;
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');
            var track = await assetRegistry.get(request.isrc);

            //console.log(transactions);
            if (transactions[0] && transactions.length > 0) {

                let currentParticipantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
                let tokenRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.TokenAccount');
                let receiptRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.PaymentReceipt');

                for (const element of transactions) {

                    let agreementQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.Agreement WHERE (isrc==_$isrc)');
                    let agreements = await businessNetworkConnection.query(agreementQuery, { isrc: request.isrc });

                    //We first evaluate if there is an agreement with this irsc 
                    if (agreements && agreements.length > 0) {

                        //DISTRIBUTION FOR THE UNIQUE AGREEMENT FOR NOW
                        let firstAgreement = agreements[0];
                        console.log('*********************AGREEMENT FIRST************************');
                        console.log("AgreementId: " + firstAgreement.agreementId);
                        console.log("EmiderName: " + firstAgreement.traderEmiterName);
                        console.log("ReceiverName: " + firstAgreement.traderReceiverName);
                        console.log("Status: " + firstAgreement.status);

                        var firstServiceFee = parseFloat(firstAgreement.percentage);
                        var ammountToAddFirstReceiver = firstServiceFee * parseFloat(element.ammount);
                        var ammountToAddFirstEmiter = parseFloat(element.ammount) - ammountToAddFirstReceiver;
                        console.log('Track revenue: ****************');
                        console.log(element.amount);
                        console.log('Service Fee: ********************');
                        console.log(firstServiceFee);
                        console.log('Ammount to Add Receiver: ******************');
                        console.log(ammountToAddFirstReceiver);
                        console.log('Ammount to Add Emitter: ******************');
                        console.log(ammountToAddFirstEmiter);

                        let firstReceiver = await currentParticipantRegistry.get(firstAgreement.traderReceiverId);
                        let tokenAccountFirstReceiver = await tokenRegistry.get(firstReceiver.tokenAccountId);

                        tokenAccountFirstReceiver.balanceEnabled += ammountToAddFirstReceiver;
                        console.log('Trader Receiver Updated***********************************');
                        console.log(tokenAccountFirstReceiver.tokenAccountId + " Quantity: " + tokenAccountFirstReceiver.balanceEnabled);

                        let firstEmiter = await currentParticipantRegistry.get(firstAgreement.traderEmiterId);
                        let tokenAccountFirstEmiter = await tokenRegistry.get(firstEmiter.tokenAccountId);

                        tokenAccountFirstEmiter.balanceEnabled += ammountToAddFirstEmiter;
                        //Finally we update the decrease of the token disabled
                        tokenAccountFirstEmiter.balanceDisabled -= parseFloat(element.ammount);
                        console.log('Trader Emitter Updated************************************');
                        console.log(tokenAccountFirstEmiter.tokenAccountId + " Quantity: " + tokenAccountFirstEmiter.balanceEnabled);
                        console.log("//////////////////////////////////////");

                        //TODO: Add the transaction record
                        await tokenRegistry.update(tokenAccountFirstReceiver);
                        await tokenRegistry.update(tokenAccountFirstEmiter);

                        //Now we submit the transactions that happened in this event

                        //This is the receipt of the earned distribution
                        let firstReceiptId = UUID();
                        let firstPaymentTransactionEarned = factory.newResource(networkNamespace, "PaymentReceipt", firstReceiptId);
                        firstPaymentTransactionEarned.isrc = request.isrc;
                        firstPaymentTransactionEarned.ammount = ammountToAddFirstReceiver;
                        firstPaymentTransactionEarned.traderEmiterId = firstEmiter.traderId;
                        firstPaymentTransactionEarned.traderReceiverId = firstReceiver.traderId;
                        firstPaymentTransactionEarned.paymentReceiptType = 'DISTRIBUTION';
                        firstPaymentTransactionEarned.agreementId = firstAgreement.agreementId;
                        firstPaymentTransactionEarned.paymentReceiptStatus = "EARNED";
                        firstPaymentTransactionEarned.paymentReceiptId = firstReceiptId;
                        firstPaymentTransactionEarned.traderEmiterName = firstEmiter.name;
                        firstPaymentTransactionEarned.traderReceiverName = firstReceiver.name;

                        await receiptRegistry.add(firstPaymentTransactionEarned);

                        //We update the variable of the ammount to add and take off the first element of the array
                        previousAmmountReceiver = ammountToAddFirstReceiver;
                        agreements.shift();

                        //DISTRIBUTION FOR THE REST OF THE AGREEMENTS
                        if (agreements.length > 0) {
                            //we make authomatic payment
                            for (const element of agreements) {
                                console.log('********************* CURRENT AGREEMENT************************');
                                console.log("AgreementId: " + element.agreementId);
                                console.log("EmiderName: " + element.traderEmiterName);
                                console.log("ReceiverName: " + element.traderReceiverName);
                                console.log("Status: " + element.status);
                                var currentAgreement = element;

                                //RETRIEVING CURRENT PARTICIPANTS
                                let receiver = await currentParticipantRegistry.get(currentAgreement.traderReceiverId);
                                let tokenAccountReceiver = await tokenRegistry.get(receiver.tokenAccountId);

                                let emiter = await currentParticipantRegistry.get(currentAgreement.traderEmiterId);
                                let tokenAccountEmiter = await tokenRegistry.get(emiter.tokenAccountId);

                                var serviceFee = parseFloat(currentAgreement.percentage);
                                var ammountToAddReceiver = serviceFee * ammountToAddFirstReceiver;
                                var ammountTReduceEmiter = ammountToAddFirstReceiver - ammountToAddReceiver;
                                console.log('Track revenue: ****************');
                                console.log(track.revenueTotal);
                                console.log('Service Fee: ********************');
                                console.log(serviceFee);
                                console.log('Ammount to Add Receiver: ******************');
                                console.log(ammountToAddReceiver);
                                console.log('Ammount to Reduce Emitter: ******************');
                                console.log(ammountTReduceEmiter);

                                console.log('Trader Receiver BEFORE***********************************');
                                console.log('Receiver Token Account Id: ' + tokenAccountReceiver.tokenAccountId);
                                console.log(receiver.name + " Token Enabled: " + tokenAccountReceiver.balanceEnabled);
                                console.log('Trader Emitter BEFORE************************************');
                                console.log('Emiter Token Account Id: ' + tokenAccountEmiter.tokenAccountId);
                                console.log(emiter.name + " Token Enabled: " + tokenAccountEmiter.balanceEnabled);

                                tokenAccountReceiver.balanceEnabled += ammountToAddReceiver;
                                console.log('Trader Receiver Updated***********************************');
                                console.log(tokenAccountReceiver.tokenAccountId + " Token Enabled: " + tokenAccountReceiver.balanceEnabled);

                                tokenAccountEmiter.balanceEnabled -= ammountTReduceEmiter;
                                console.log('Trader Emitter Updated************************************');
                                console.log(tokenAccountEmiter.tokenAccountId + " Token Enabled: " + tokenAccountEmiter.balanceEnabled);
                                console.log("//////////////////////////////////////");

                                //TODO: Add the transaction records
                                await tokenRegistry.update(tokenAccountReceiver);
                                await tokenRegistry.update(tokenAccountEmiter);

                                //Now we submit the transactions that happened in this event
                                let currentReceiptId = UUID();
                                let currentPaymentTransaction = factory.newTransaction(networkNamespace, "PaymentReceipt", currentReceiptId);
                                currentPaymentTransaction.isrc = requestPayment.isrc;
                                currentPaymentTransaction.ammount = ammountToAddReceiver;
                                currentPaymentTransaction.traderEmiterId = emiter.traderId;
                                currentPaymentTransaction.traderReceiverId = receiver.traderId;
                                currentPaymentTransaction.paymentReceiptType = 'DISTRIBUTION';
                                currentPaymentTransaction.agreementId = currentAgreement.agreementId;
                                currentPaymentTransaction.paymentReceiptStatus = "EARNED";
                                currentPaymentTransaction.paymentReceiptId = currentReceiptId;
                                currentPaymentTransaction.traderEmiterName = emiter.name;
                                currentPaymentTransaction.traderReceiverName = receiver.name;

                                await receiptRegistry.add(currentPaymentTransaction);

                                previousAmmountReceiver = ammountToAddReceiver;
                                //Response for existing agreements 
                                dataModel.data = JSON.stringify("Number of agreements distributed: " + (agreements.length + 1));
                                dataModel.status = '200';
                                return dataModel;
                            }
                        }
                        dataModel.data = JSON.stringify("Track revenue added to current user: " + ammountToAddFirstEmiter);
                        dataModel.status = '200';
                        return dataModel;

                    } else {
                        dataModel.message = JSON.stringify("There were no previous agreements to distribute");
                        dataModel.status = '300';
                        return dataModel;
                    }
                }
                dataModel.message = JSON.stringify("There were no previous agreements to distribute");
                dataModel.status = '300';
                return dataModel;

            } else {
                dataModel.message = JSON.stringify('There are not receipts');
                dataModel.status = '300';
                return dataModel;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

}
module.exports = ManualPaymentChaincode;