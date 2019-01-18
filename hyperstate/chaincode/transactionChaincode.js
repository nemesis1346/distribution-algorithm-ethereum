'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const winston = require('winston');
const UserModel = require('../models/userModel.js');
const cardname = 'admin@hyperstate';
const networkNamespace = 'org.membran.hyperstate';
const LOG = winston.loggers.get('application');
const UUID = require('uuid/v1');
const DataModel = require('../models/dataModel.js');
const AgreementModel = require('../models/agreementModel.js');
const Async = require('async');
const TraderModel = require('../models/traderModel.js');
const PaymentReceiptModel = require('../models/paymentReceiptModel.js');

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

    async withdrawalByTrader(withdrawalByTraderRequest) {
        let transactionList = [];
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('WithDrawal By Trader in Composer.js: ');
        console.log(withdrawalByTraderRequest);
        try {

            let txList = JSON.parse(withdrawalByTraderRequest.txList);
            let traderId = withdrawalByTraderRequest.traderId;
            let oweTotal = withdrawalByTraderRequest.oweTotal;

            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname);
            let receiptRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.PaymentReceipt');
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let tokenRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.TokenAccount');

            let traderTokenAccount = await tokenRegistry.get(traderId);

            for (const element of txList) {
                let currentReceipt = await receiptRegistry.get(element.paymentReceiptId);
                currentReceipt.paymentReceiptStatus = 'SPENT';
                console.log('Receipt ammount: ' + currentReceipt.ammount);
                await receiptRegistry.update(currentReceipt);
            }

            dataModel.data = JSON.stringify(txList.length + ' updated');
            dataModel.status = '200';
            return dataModel;

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async getTxByStatusTypeTrader(request) {
        let transactionList = [];
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('getTxByStatusTypeTrader in Composer.js: ');
        console.log(request);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let traderReceiverId = request.traderReceiverId;
            let traderEmiterId = request.traderEmiterId;
            let paymentReceiptStatus = request.paymentReceiptStatus;
            let paymentReceiptType = request.paymentReceiptType;
            let connection = await businessNetworkConnection.connect(cardname);
            let transactions = [];

            console.log(paymentReceiptStatus);
            console.log(paymentReceiptType);
            let query = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.PaymentReceipt WHERE (traderReceiverId == _$inputTraderReceiverId AND traderEmiterId == _$inputTraderEmiterId AND paymentReceiptStatus == _$inputStatus AND paymentReceiptType == _$inputType)');
            transactions = await businessNetworkConnection.query(query, { inputTraderEmiterId: traderEmiterId, inputTraderReceiverId: traderReceiverId, inputStatus: paymentReceiptStatus, inputType: paymentReceiptType });

            if (transactions[0] && transactions.length > 0) {
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
                        element.traderReceiverName,
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
                dataModel.message = JSON.stringify('There are not receipts');
                dataModel.status = '300';
                return dataModel;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    /**
        * @description this method is for the profile.
        * @return {transactions} it returns a list of transacitons 
        */
    async getTxByEmiterForBalance(traderId) {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request  Get Transactions by Trader in Composer.js: ');
        console.log(traderId);
        let receiptList = [];
        let organizedTransactions = [];
        let currentDebtTotal = 0;
        let receiverName = "";
        let receiverId = "";
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            connection.getFactory();

            let receiptsQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.PaymentReceipt WHERE (traderEmiterId==_$input AND paymentReceiptType== _$inputType AND paymentReceiptStatus==_$inputStatus)');
            let receipts = await businessNetworkConnection.query(receiptsQuery, { input: traderId, inputType: 'DISTRIBUTION', inputStatus: 'EARNED' });

            if (receipts && receipts.length > 0) {
                receipts.forEach(element => {
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
                        element.traderReceiverName,
                        element.datetime,
                        element.uploaderId,
                        element.percentageReceiver
                    );
                    receiptList.push(currentReceipt);
                });

                //Now we get the unique objects from the list
                let flags = {};
                let receiverList = receiptList.filter(function (entry) {
                    if (flags[entry.traderReceiverId]) {
                        return false;
                    }
                    flags[entry.traderReceiverId] = true;
                    return true;
                });

                //Now we group the transactions
                for (const element of receiverList) {
                    let currentTxByReceiverList = receiptList.filter(item => {
                        console.log(item);
                        if (String(item.traderEmiterId) == String(element.traderEmiterId)) {
                            console.log(receiptList);
                            receiverName = element.traderReceiverName;
                            receiverId = element.traderReceiverId;
                            currentDebtTotal += Number(element.ammount);
                            return true;
                        } else {
                            return false;
                        }

                    });
                    //We compute the total owning value

                    organizedTransactions.push({ "txList": JSON.stringify(currentTxByReceiverList), "total": currentDebtTotal, "traderReceiverName": receiverName, "traderReceiverId": receiverId });
                }
                dataModel.data = JSON.stringify(organizedTransactions);
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
     * @description this method is for the profile.
     * @return {transactions} it returns a list of transacitons 
     */
    async getTxByReceiverForBalance(traderId) {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request  Get Transactions by Trader in Composer.js: ');
        console.log(traderId);
        let receiptList = [];
        let organizedTransactions = [];
        let currentEarnedTotal = 0;
        let emiterName = "";
        let emiterId = "";
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            connection.getFactory();

            let receiptsQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.PaymentReceipt WHERE (traderReceiverId==_$input AND paymentReceiptType== _$inputType AND paymentReceiptStatus==_$inputStatus)');
            let receipts = await businessNetworkConnection.query(receiptsQuery, { input: traderId, inputType: 'DISTRIBUTION', inputStatus: 'EARNED' });

            if (receipts && receipts.length > 0) {
                receipts.forEach(element => {
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
                        element.traderReceiverName,
                        element.datetime,
                        element.uploaderId,
                        element.percentageReceiver
                    );
                    receiptList.push(currentReceipt);
                });

                //Now we get the unique objects from the list
                let flags = {};
                let emiterList = receiptList.filter(function (entry) {
                    if (flags[entry.traderEmiterId]) {
                        return false;
                    }
                    flags[entry.traderEmiterId] = true;
                    return true;
                });

                //Now we group the transactions
                for (const element of emiterList) {
                    let currentTxByEmitterList = receiptList.filter(item => {
                        console.log(item);
                        if (String(item.traderEmiterId) == String(element.traderEmiterId)) {
                            console.log(receiptList);
                            currentEarnedTotal += Number(element.ammount);
                            return true;
                        } else {
                            return false;
                        }

                    });
                    //We compute the total owning value

                    emiterName = element.traderEmiterName;
                    emiterId = element.traderEmiterId;
                    organizedTransactions.push({ "txList": JSON.stringify(currentTxByEmitterList), "total": currentEarnedTotal, "traderEmiterName": emiterName, "traderEmiterId": emiterId });
                }
                dataModel.data = JSON.stringify(organizedTransactions);
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
     * @description this method is for getting all the transactions on the system that involves the current trader either as emiter or as a receiver
     * @return {transctions} it returns a list of transactions
     */
    async getTransactionsByTrader(getTransactionsByTraderRequest) {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request  Get Transactions by Trader in Composer.js: ');
        console.log(getTransactionsByTraderRequest);
        //let request =  JSON.parse(getTransactionsByTraderRequest);
        let traderId = getTransactionsByTraderRequest.traderId;
        let receiptList = [];
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            connection.getFactory();

            let receiptsQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.PaymentReceipt WHERE (traderReceiverId==_$input OR traderEmiterId== _$input)');
            let receipts = await businessNetworkConnection.query(receiptsQuery, { input: traderId });

            if (receipts && receipts.length > 0) {
                receipts.forEach(element => {
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
                        element.traderReceiverName,
                        element.datetime,
                        element.uploaderId,
                        element.percentageReceiver
                    );
                    receiptList.push(currentReceipt);
                });

                dataModel.data = JSON.stringify(receiptList);
                dataModel.status = '200';
                return dataModel;
            } else {
                dataModel.message = 'There are not receipts';
                dataModel.status = '300';
                return dataModel;
            }
        } catch (error) {
            businessNetworkConnection.disconnect();
            console.log(error);
            throw new Error(error);
        }
    }
    /**
   * @description this method is for getting all the transactions on the system that involves the current trader either as emiter or as a receiver
   * @return {transctions} it returns a list of transactions
   */
    async getTransactions() {
        let dataModel = new DataModel(null, null, null);

        console.log('************************************');
        console.log('Request  Get Transactions in Composer.js: ');
        let receiptList = [];
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            connection.getFactory();
            let assetRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.PaymentReceipt');

            let receipts = await assetRegistry.getAll();
            if (receipts && receipts.length > 0) {
                receipts.forEach(element => {
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
                        element.traderReceiverName,
                        element.datetime,
                        element.uploaderId,
                        element.percentageReceiver
                    );
                    receiptList.push(currentReceipt);
                });

                dataModel.data = JSON.stringify(receiptList);
                dataModel.status = '200';
                return dataModel;
            } else {
                dataModel.message = 'There are not receipts';
                dataModel.status = '300';
                return dataModel;
            }
        } catch (error) {
            businessNetworkConnection.disconnect();
            console.log(error);
            throw new Error(error);
        }
    }

    /**TODO: This needs to be improved to update the transactions 
     * @description This method is for withdrawing the ammount requested and update the trader 
     * @returns {Promise} a promise that is the confirmation of the withdraw
     * @param {traderId}
     * @param {tokenAccountId}
     * @param {ammount}
     */
    async withdraw(requestWithdraw) {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Withdraw in Composer.js: ');
        console.log(requestWithdraw);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            await businessNetworkConnection.connect(cardname);
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry(networkNamespace + '.Trader');
            let trader = await participantRegistry.get(requestWithdraw.traderId);

            let tokenAccountRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.TokenAccount');
            let traderTokenAccount = await tokenAccountRegistry.get(trader.tokenAccountId);

            traderTokenAccount.balanceEnabled -= parseFloat(requestWithdraw.ammount);
            //TODO: record transaction

            await tokenAccountRegistry.update(traderTokenAccount);

            dataModel.message = JSON.stringify("Withdraw: " + requestWithdraw.ammount + " done...");
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log('ERROR IN TRANSACTION CHAINCODE');
            console.log(error);
            throw new Error(error);
        }
    }

    /**
   * @description this function is for giving the last distribution of one track for the diagram
   * @return {Promise} Just return a list of receipts of the sarme isrc and date
   */
    async getTxByTrackForDiagram(isrc) {
        let dataModel = new DataModel(null, null, null);
        let result={"receiptList":"","uploaderId":"","trackRevenue":""};
        let receiptList = [];
        console.log('************************************');
        console.log('GetTxByTrackForDiagram in Composer.js: ');
        console.log(isrc);
        try {
            let businessNetworkConnection = new BusinessNetworkConnection();
            let connection = await businessNetworkConnection.connect(cardname);
            connection.getFactory();

            let trackRegistry = await businessNetworkConnection.getAssetRegistry(networkNamespace + '.Track');
            let track = await trackRegistry.get(isrc);

            let receiptQuery = businessNetworkConnection.buildQuery('SELECT org.membran.hyperstate.PaymentReceipt WHERE (isrc==_$isrc)');
            let receipts = await businessNetworkConnection.query(receiptQuery, { isrc: isrc });

            if (receipts && receipts.length > 0) {

                receipts.forEach(async function (element) {
                    console.log('Agreement: ************************');
                    console.log("AgreementId: " + element.agreementId);
                    console.log("EmiderId: " + element.traderEmiterId);
                    console.log("ReceiverId: " + element.traderReceiverId);
                    console.log("Status: " + element.status);

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
                        element.traderReceiverName,
                        element.datetime,
                        element.uploaderId,
                        element.percentageReceiver
                    );
                    receiptList.push(currentReceipt);
                });
                console.log('ALL RECEIPTS');
                console.log(receiptList);

                //We get the organize the unique dates into a list
                let flags = {};
                let uniqueDateAgreementList= receiptList.filter(function (entry) {
                    if (flags[entry.datetime]) {
                        return false;
                    }
                    flags[entry.datetime] = true;
                    return true;
                });
                console.log('FILTERED LIST');
                console.log(uniqueDateAgreementList);

                let lastReceipt=uniqueDateAgreementList[0];
                
                let filteredList = receiptList.filter(item => {
                    if (String(item.datetime) == String(lastReceipt.datetime)) {
                        return true;
                    } else {
                        return false;
                    }
                });

                result.uploaderId =lastReceipt.uploaderId;
                result.receiptList=JSON.stringify(filteredList);
                result.trackRevenue=track.revenueTotal;

                dataModel.data = JSON.stringify(result);
                dataModel.status = '200';

                return dataModel;
            } else {
                dataModel.message = 'There is no receipt';
                dataModel.status = '300';

                return dataModel;
            }
        } catch (error) {
            console.log('ERROR IN GET_TX_FOR_DIAGRAM BY TRACKS');
            console.log(error);
            throw new Error(error);
        }
    }
}
module.exports = TransactionChaincode;