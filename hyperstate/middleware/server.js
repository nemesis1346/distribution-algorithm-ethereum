'use strict';
const port = 3011
//Imports
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const TraderChaincode = require('../chaincode/traderChaincode.js');
const TrackChaincode = require('../chaincode/trackChaincode.js');
const OrganizationChaincode = require('../chaincode/organizationChaincode.js');
const TransactionChaincode = require('../chaincode/transactionChaincode.js');
const AgreementChaincode = require('../chaincode/agreementChaincode.js');
const DataModel = require('../models/dataModel.js');
const DistributionAlgorithmChaincode = require('../chaincode/distributionAlgorithmChaincode.js');
const UserChaincode = require('../chaincode/userChaincode.js');
const ManualPaymentChaincode = require('../chaincode/manualPaymentChaincode.js');
//const { exec, spawn, fork, execFile } = require('promisify-child-process')
const { fork } = require('child_process');

const app = express();

const handler = async (request, response) => {
    const { headers, method, url } = request;
    let buffer = [];
    request.on('error', (err) => {
        console.log("Error", err);
    }).on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', async () => {
        let bufferContent = Buffer.concat(buffer).toString();

        //Set response
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        response.on('error', (err) => {
            console.error(err);
        });
        //Call method
        let promise;
        let dataModel = new DataModel(null, null, null);

        try {
            switch (url) {
                case '/createTrader':
                    promise = this.traderChaincode.createTrader(JSON.parse(bufferContent));
                    break;
                case '/login':
                    promise = this.userChaincode.login(JSON.parse(bufferContent));
                    break;
                case '/createTrack':
                    promise = this.trackChaincode.createTrack(JSON.parse(bufferContent));
                    break;
                case '/createOrganization':
                    promise = this.organizationChaincode.createOrganization(JSON.parse(bufferContent));
                    break;
                case '/createAgreement':
                    promise = this.agreementChaincode.createAgreement(JSON.parse(bufferContent));
                    break;
                case '/createNewTokenAccount':
                    promise = this.traderChaincode.createNewTokenAccount(JSON.parse(bufferContent));
                    break;
                case '/getTraders':
                    promise = this.traderChaincode.getTraders();
                    break;
                case '/getOrganizations':
                    promise = this.organizationChaincode.getOrganizations();
                    break;
                case '/getTracks':
                    promise = this.trackChaincode.getTracks();
                    break;
                case '/getTrackDetail':
                    promise = this.trackChaincode.getTrackDetail(JSON.parse(bufferContent));
                    break;
                case '/getTraderDetail':
                    promise = this.traderChaincode.getTraderDetail(JSON.parse(bufferContent));
                    break;
                case '/getTokenAccountDetail':
                    promise = this.traderChaincode.getTokenAccountDetail(JSON.parse(bufferContent));
                    break;
                case '/paymentDistributionAutomatic':
                    promise = this.transactionChaincode.paymentDistributionAutomatic(JSON.parse(bufferContent));
                    break;
                case '/getAgreementsByTrack':
                    promise = this.agreementChaincode.getAgreementByTrack(JSON.parse(bufferContent));
                    break;
                case '/removeAgreement':
                    promise = this.agreementChaincode.removeAgreement(JSON.parse(bufferContent));
                    break;
                case '/withdraw':
                    promise = this.transactionChaincode.withdraw(JSON.parse(bufferContent));
                    break;
                case '/getTransactionsByTrader':
                    promise = this.transactionChaincode.getTransactionsByTrader(JSON.parse(bufferContent));
                    break;
                case '/updateTrack':
                    promise = this.trackChaincode.updateTrack(JSON.parse(bufferContent));
                    break;
                case '/getEarnedDistTransactionsByTraderAndISRC':
                    promise = this.agreementChaincode.getEarnedDistTransactionsByTraderAndISRC(JSON.parse(bufferContent));
                    break;
                case '/manualPayment':
                    promise = this.manualPaymentChaincode.manualPayment(JSON.parse(bufferContent));
                    break;
                case '/getTxByStatusTypeTrader':
                    promise = this.transactionChaincode.getTxByStatusTypeTrader(JSON.parse(bufferContent));
                    break;
                case '/getTransactions':
                    promise = this.transactionChaincode.getTransactions();
                    break;
                case '/onHoldDistribution':
                    promise = this.transactionChaincode.onHoldDistribution(JSON.parse(bufferContent));
                    break;
                case '/cascadeDistribution':
                    promise = this.transactionChaincode.cascadeDistribution(JSON.parse(bufferContent));
                    break;
                case '/evaluateEmiters':
                    promise = this.transactionChaincode.evaluateEmiters(JSON.parse(bufferContent));
                    break;
                case '/getTxByReceiverForBalance':
                    promise = this.transactionChaincode.getTxByReceiverForBalance(JSON.parse(bufferContent));
                    break;
                case '/withdrawalByTrader':
                    promise = this.transactionChaincode.withdrawalByTrader(JSON.parse(bufferContent));
                    break;
                case '/getTxByEmiterForBalance':
                    promise = this.transactionChaincode.getTxByEmiterForBalance(JSON.parse(bufferContent));
                    break;
                case '/distributionAlgorithm':
                    promise = this.distributionAlgorithmChaincode.distribution(JSON.parse(bufferContent));
                    break;
                case '/getAgreements':
                    promise = this.agreementChaincode.getAgreements();
                    break;
                case '/getTxByTrackForDiagram':
                    promise = this.transactionChaincode.getTxByTrackForDiagram(JSON.parse(bufferContent));
                    break;
                default:
                    dataModel.message = 'Method not found';
                    dataModel.status = '405';
                    let body = JSON.stringify(dataModel);

                    console.log('STATUS 405: ');
                    console.log('Method not found');
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 405;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                    break;
            }

            //Executing the promise , maybe need POST and GET
            if (promise != null) {
                //TODO: Here I must change it to promisify
                //let promisifyChildProcess = fork(promise);
                //                 fork.on('message',function(result){
                //     console.log(result);
                // });
                // promisifyChildProcess.on('message', (m) => {
                //     console.log('PARENT got message:', m);
                //   });

                promise.then(function (result) {
                    console.log(result);
                    //This is status 200 , everything ok
                    if (result) {
                        if (result.status == '200') {
                            dataModel.data = result;
                            dataModel.status = '200';
                        } else {
                            console.log(dataModel)
                            dataModel.message = result;
                            dataModel.status = '300';
                        }
                    } else {
                        console.log('Something went wrong');
                        console.log(result);
                    }
                    let body = JSON.stringify(dataModel);
                    console.log('STATUS 200: ');
                    console.log(body);
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 200;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                }).catch((error) => {
                    console.log('ERROR IN GATE');

                    dataModel.message = error.message.toString();
                    dataModel.status = '400';
                    let body = JSON.stringify(dataModel);
                    console.log('ERROR 400:');
                    console.log(dataModel);
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 300;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                });
            }
        } catch (error) {
            dataModel.message = error.message.toString();
            dataModel.status = '500';
            let body = JSON.stringify(dataModel);
            console.log('ERROR 500:');
            console.log(error);
            const responseBody = { headers, method, url, body };

            response.statusCode = 500;
            response.write(JSON.stringify(responseBody));
            response.end();
        }
    });
}

app.post('/login', handler);
app.post('/createTrader', handler);
app.post('/createOrganization', handler);
app.post('/createTrack', handler);
app.post('/createAgreement', handler);
app.post('/getAgreementsByTrack', handler);
//app.post('/getAgreementDetail', handler); //it is not posible to query concepts
app.get('/getTraders', handler);
app.get('/getOrganizations', handler);
app.get('/getTracks', handler);
app.post('/createNewTokenAccount', handler);
app.post('/getTrackDetail', handler);
app.post('/getTraderDetail', handler);
app.post('/getTokenAccountDetail', handler);
app.post('/paymentDistributionAutomatic', handler);
app.post('/removeAgreement', handler);
app.post('/withdraw', handler);
app.post('/getTransactionsByTrader', handler);
app.post('/updateTrack', handler);
app.post('/manualPayment', handler);
app.post('/getEarnedDistTransactionsByTraderAndISRC', handler);
app.post('/getTransactions', handler);
app.post('/getTxByStatusTypeTrader', handler);
app.post('/onHoldDistribution', handler);
app.post('/cascadeDistribution', handler);
app.post('/evaluateEmiters', handler);
app.post('/getTxByReceiverForBalance', handler);
app.post('/withdrawalByTrader', handler);
app.post('/getTxByEmiterForBalance', handler);
app.post('/distributionAlgorithm', handler);
app.post('/getAgreements', handler);
app.post('/getTxByTrackForDiagram', handler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    try {
        //Instance of the network and transactions
        this.trackChaincode = new TrackChaincode();
        this.transactionChaincode = new TransactionChaincode();
        this.traderChaincode = new TraderChaincode();
        this.organizationChaincode = new OrganizationChaincode();
        this.agreementChaincode = new AgreementChaincode();
        this.userChaincode = new UserChaincode();
        this.manualPaymentChaincode = new ManualPaymentChaincode();
        this.distributionAlgorithmChaincode = new DistributionAlgorithmChaincode();
    } catch (error) {
        console.log("Error Composer instance: ", error);
    }
    console.log('server is listening on: ', port);
});
