const DataModel = require("../models/dataModel");
const TraderChaincode = require('../chaincode/traderChaincode.js');
const TrackChaincode = require('../chaincode/trackChaincode.js');
const OrganizationChaincode = require('../chaincode/organizationChaincode.js');
const TransactionChaincode = require('../chaincode/transactionChaincode.js');
const AgreementChaincode = require('../chaincode/agreementChaincode.js');
const DistributionAlgorithmChaincode = require('../chaincode/distributionAlgorithmChaincode.js');
const UserChaincode = require('../chaincode/userChaincode.js');
const ManualPaymentChaincode = require('../chaincode/manualPaymentChaincode.js');
const TestingChaincode = require('../chaincode/testingChaincode.js');

process.on('message', async function (input) {
    //Call method
    let result;
    let dataModel = new DataModel(null, null, null);
    let trackChaincode = new TrackChaincode();
    let organizationChaincode = new OrganizationChaincode();
    let agreementChaincode = new AgreementChaincode();
    let traderChaincode = new TraderChaincode();
    let transactionChaincode = new TransactionChaincode();
    let manualPaymentChaincode = new ManualPaymentChaincode();
    let distributionAlgorithmChaincode = new DistributionAlgorithmChaincode();
    let userChaincode = new UserChaincode();
    let testingChaincode = new TestingChaincode();
    try {
        let bufferContent = JSON.parse(input.data);
        let url = input.url;
        switch (url) {
            case '/createTrader':
                result = await traderChaincode.createTrader(JSON.parse(bufferContent));
                break;
            case '/login':
                result = await userChaincode.login(JSON.parse(bufferContent));
                break;
            case '/createTrack':
                result = await trackChaincode.createTrack(JSON.parse(bufferContent));
                break;
            case '/createOrganization':
                result = await organizationChaincode.createOrganization(JSON.parse(bufferContent));
                break;
            case '/createAgreement':
                result = await agreementChaincode.createAgreement(JSON.parse(bufferContent));
                break;
            case '/createNewTokenAccount':
                result = await traderChaincode.createNewTokenAccount(JSON.parse(bufferContent));
                break;
            case '/getTraders':
                result = await traderChaincode.getTraders();
                break;
            case '/getOrganizations':
                result = await organizationChaincode.getOrganizations();
                break;
            case '/getTracks':
                result = await trackChaincode.getTracks();
                break;
            case '/getTrackDetail':
                result = await trackChaincode.getTrackDetail(JSON.parse(bufferContent));
                break;
            case '/getTraderDetail':
                result = await traderChaincode.getTraderDetail(JSON.parse(bufferContent));
                break;
            case '/getTokenAccountDetail':
                result = await traderChaincode.getTokenAccountDetail(JSON.parse(bufferContent));
                break;
            case '/paymentDistributionAutomatic':
                result = await transactionChaincode.paymentDistributionAutomatic(JSON.parse(bufferContent));
                break;
            case '/getAgreementsByTrack':
                result = await agreementChaincode.getAgreementByTrack(JSON.parse(bufferContent));
                break;
            case '/removeAgreement':
                result = await agreementChaincode.removeAgreement(JSON.parse(bufferContent));
                break;
            case '/withdraw':
                result = await transactionChaincode.withdraw(JSON.parse(bufferContent));
                break;
            case '/getTransactionsByTrader':
                result = await transactionChaincode.getTransactionsByTrader(JSON.parse(bufferContent));
                break;
            case '/updateTrack':
                result = await trackChaincode.updateTrack(JSON.parse(bufferContent));
                break;
            case '/getEarnedDistTransactionsByTraderAndISRC':
                result = await agreementChaincode.getEarnedDistTransactionsByTraderAndISRC(JSON.parse(bufferContent));
                break;
            case '/manualPayment':
                result = await manualPaymentChaincode.manualPayment(JSON.parse(bufferContent));
                break;
            case '/getTxByStatusTypeTrader':
                result = await transactionChaincode.getTxByStatusTypeTrader(JSON.parse(bufferContent));
                break;
            case '/getTransactions':
                result = await transactionChaincode.getTransactions();
                break;
            case '/onHoldDistribution':
                result = await transactionChaincode.onHoldDistribution(JSON.parse(bufferContent));
                break;
            case '/cascadeDistribution':
                result = await transactionChaincode.cascadeDistribution(JSON.parse(bufferContent));
                break;
            case '/evaluateEmiters':
                result = await transactionChaincode.evaluateEmiters(JSON.parse(bufferContent));
                break;
            case '/getTxByReceiverForBalance':
                result = await transactionChaincode.getTxByReceiverForBalance(JSON.parse(bufferContent));
                break;
            case '/withdrawalByTrader':
                result = await transactionChaincode.withdrawalByTrader(JSON.parse(bufferContent));
                break;
            case '/getTxByEmiterForBalance':
                result = await transactionChaincode.getTxByEmiterForBalance(JSON.parse(bufferContent));
                break;
            case '/distributionAlgorithm':
                result = await distributionAlgorithmChaincode.distribution(JSON.parse(bufferContent));
                break;
            case '/getAgreements':
                result = await agreementChaincode.getAgreements();
                break;
            case '/getTxByTrackForDiagram':
                result = await transactionChaincode.getTxByTrackForDiagram(JSON.parse(bufferContent));
                break;
            case '/testing_example1':
                result = await testingChaincode.example1();
                break;
            case '/testing_example2':
                result = await testingChaincode.example2();
                break;
            case '/testing_example3':
                result = await testingChaincode.example3();
                break;
            case '/testing_example4':
                result = await testingChaincode.example4();
                break;
            case '/testing_example5':
                result = await testingChaincode.example5();
                break;
            case '/testing_example6':
                result = await testingChaincode.example6();
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
            console.log(result);
            //This is status 200 , everything ok
            if (result) {
                if (result.status == "200") {
                    dataModel.data = result;
                    dataModel.status = "200";
                } else {
                    console.log(dataModel);
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