const DataModel = require("../models/dataModel");
const traderEndpoint = require('../connection/traderEndpoint.js');
const trackEndpoint = require('../connection/trackEndpoint.js');
const receiptEndpoint = require('../connection/receiptEndpoint.js');
const agreementEndpoint = require('../connection/agreementEndpoint.js');
const distributionEndpoint = require('../connection/distributionEndPoint.js');
const testingEndpoint=require('../connection/testingEndpoint.js');

process.on('message', async function (input) {
    //Call method
    //TODO: must change the way the methods are called
    let result;
    let dataModel = new DataModel(null, null, null);

    try {
        let bufferContent = JSON.parse(input.data);
        let url = input.url;
        switch (url) {
            case '/createTrader':
                result = await traderEndpoint.createTrader(JSON.parse(bufferContent));
                break;
            case '/createTrack':
                result = await trackEndpoint.createTrack(JSON.parse(bufferContent));
                break;
            case '/createAgreement':
                result = await agreementEndpoint.createAgreement(JSON.parse(bufferContent));
                break;
            case '/createNewTokenAccount':
                result = await traderEndpoint.createNewTokenAccount(JSON.parse(bufferContent));
                break;
            case '/getTraders':
                result = await traderEndpoint.getTraders();
                break;
            case '/getTracks':
                result = await trackEndpoint.getTracks();
                break;
            case '/getTrackDetail':
                result = await trackEndpoint.getTrackDetail(JSON.parse(bufferContent));
                break;
            case '/getTraderDetail':
                result = await traderEndpoint.getTraderDetail(JSON.parse(bufferContent));
                break;
            case '/getTokenAccountDetail':
                result = await traderEndpoint.getTokenAccountDetail(JSON.parse(bufferContent));
                break;
            case '/paymentDistributionAutomatic':
                result = await receiptEndpoint.paymentDistributionAutomatic(JSON.parse(bufferContent));
                break;
            case '/getAgreementsByTrack':
                result = await agreementEndpoint.getAgreementByTrack(JSON.parse(bufferContent));
                break;
            case '/removeAgreement':
                result = await agreementEndpoint.removeAgreement(JSON.parse(bufferContent));
                break;
            case '/getTransactionsByTrader':
                result = await receiptEndpoint.getTransactionsByTrader(JSON.parse(bufferContent));
                break;
            case '/updateTrack':
                result = await trackEndpoint.updateTrack(JSON.parse(bufferContent));
                break;
            case '/getEarnedDistTransactionsByTraderAndISRC':
                result = await agreementEndpoint.getEarnedDistTransactionsByTraderAndISRC(JSON.parse(bufferContent));
                break;
            case '/getTxByStatusTypeTrader':
                result = await receiptEndpoint.getTxByStatusTypeTrader(JSON.parse(bufferContent));
                break;
            case '/getTransactions':
                result = await receiptEndpoint.getTransactions();
                break;
            case '/getTxByReceiverForBalance':
                result = await receiptEndpoint.getTxByReceiverForBalance(JSON.parse(bufferContent));
                break;
            case '/withdrawalByTrader':
                result = await receiptEndpoint.withdrawalByTrader(JSON.parse(bufferContent));
                break;
            case '/getTxByEmiterForBalance':
                result = await receiptEndpoint.getTxByEmiterForBalance(JSON.parse(bufferContent));
                break;
            case '/distributionAlgorithm':
                result = await distributionEndpoint.distribution(JSON.parse(bufferContent));
                break;
            case '/getAgreements':
                result = await agreementEndpoint.getAgreements();
                break;
            case '/getTxByTrackForDiagram':
                result = await receiptEndpoint.getTxByTrackForDiagram(JSON.parse(bufferContent));
                break;
            case '/testing_example1':
                result = await testingEndpoint.example1();
                break;
            case '/testing_example2':
                result = await testingEndpoint.example2();
                break;
            case '/testing_example3':
                result = await testingEndpoint.example3_scenario3();
                break;
            case '/testing_example4':
                result = await testingEndpoint.example4_scenario1();
                break;
            case '/testing_example5':
                result = await testingEndpoint.example5_scenario2();
                break;
            case '/testing_example6':
                result = await testingEndpoint.example6();
                break;
            default:
                dataModel.message = "Method not found";
                dataModel.status = "405";
                let body = JSON.stringify(dataModel);
                console.log("STATUS 405: ");
                console.log("Method not found");
                process.send(body);
                break;
        }

        //Executing the promise , maybe need POST and GET
        if (result != null) {
            //console.log(result);
            //This is status 200 , everything ok
            if (result) {
                if (result.status == "200") {
                    dataModel.data = result;
                    dataModel.status = "200";
                } else {
                   // console.log(dataModel);
                    dataModel.message = result;
                    dataModel.status = "300";
                }
            } else {
                console.log("Something went wrong");
                console.log(result);
            }
            let body = JSON.stringify(dataModel);
            console.log("STATUS 200: ");
            console.log(body);
            process.send(body);
        }
    } catch (error) {
        console.log("ERROR IN GATE");
        dataModel.message = error.message.toString();
        dataModel.status = "400";
        let body = JSON.stringify(dataModel);
        console.log("ERROR 400:");
        console.log(dataModel);
        process.send(body);
    }
});