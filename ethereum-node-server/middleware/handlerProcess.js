const DataModel = require("../models/dataModel");
const traderEndpoint = require('../controllers/traderEndpoint.js');
const trackEndpoint = require('../controllers/trackEndpoint.js');
const receiptEndpoint = require('../controllers/receiptEndpoint.js');
const agreementEndpoint = require('../controllers/agreementEndpoint.js');
const distributionEndpoint = require('../controllers/distributionEndPoint.js');
const testingEndpoint = require('../controllers/testingEndpoint.js');
const tokenAccountEndpoint = require('../controllers/tokenAccountEndpoint.js');

async function stop() {
    console.log('Shutting down...')
    if (process.env.DEBUG) console.log(process._getActiveHandles()){
        process.exit(0)
    }
}
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM')
    await stop()
})

process.on('SIGINT', async () => {
    console.log('Received SIGINT')
    await stop()
})
process.on('message', async function (input) {
    //Call method
    //TODO: must change the way the methods are called: setting correct responses. From the beginning. 
    //TODO: Tokenized systems for the reatapp and mobiles. 
    console.log('LISTENING MESSAGE');
    console.log(input);
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
                result = await traderEndpoint.getTrader(JSON.parse(bufferContent));
                break;
            case '/getTokenAccountDetail':
                result = await tokenAccountEndpoint.getTokenAccount(JSON.parse(bufferContent));
                break;
            case '/updateTrack':
                result = await trackEndpoint.updateTrackRevenue(JSON.parse(bufferContent));
                break;
            case '/getTransactions':
                result = await receiptEndpoint.getTransactions();
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
                result = await testingEndpoint.example3();
                break;
            case '/testing_example4':
                result = await testingEndpoint.example4();
                break;
            case '/testing_example5':
                result = await testingEndpoint.example5();
                break;
            case '/testing_example6':
                result = await testingEndpoint.example6();
                break;
            case '/getTAContractAddress':
                result = await tokenAccountEndpoint.getTAContractAddress();
                break;
            case '/getTraderContractAddress':
                result = await traderEndpoint.getTraderContractAddress();
                break;
            case '/getTrackContractAddress':
                result = await trackEndpoint.getTrackContractAddress();
                break;

            default:
                dataModel.message = "Method not found";
                dataModel.status = "404";
                let body = JSON.stringify(dataModel);
                console.log("STATUS 404: ");
                console.log("Method not found");
                // process.send(body);
                process.status(404).end();
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
        //STILL NOT WORKING 
        //process.exit(0)

    } catch (error) {
        console.log("ERROR IN HANDLER PROCESS");
        dataModel.message = error.message.toString();
        dataModel.status = "400";
        let body = JSON.stringify(dataModel);
        console.log("ERROR 400:");
        console.log(dataModel);
        process.send(body);
    }
});

