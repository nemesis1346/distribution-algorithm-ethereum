const contractTruffle = require("truffle-contract");
const Web3 = require("web3");
const web3Provider = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
);
const trackEndpoint = require("./trackEndpoint");
const traderEndpoint = require("./traderEndpoint");
const agreementEndpoint = require("./agreementEndpoint");
const tokenAccountEndpoint = require('./tokenAccountEndpoint');
const receiptEndpoint = require('./receiptEndpoint');
//Artifacts
const trader_artifact = require("../build/contracts/Traders.json");
const track_artifact = require("../build/contracts/Tracks.json");
//Contract
const TradersContract = contractTruffle(trader_artifact);
const TracksContract = contractTruffle(track_artifact);
//Setting Providers
TradersContract.setProvider(web3Provider.currentProvider);
TracksContract.setProvider(web3Provider.currentProvider);
//models
const ReceiverShareModel = require("../models/receiverShareModel.js");
const DataModel = require('../models/dataModel.js');
const OnHoldDistributionRequest = require('../models/onHoldDistributionRequest.js');
const DistributionProcessRequest = require('../models/distributionProcessRequest.js');
const EvaluateReceiptRequest = require('../models/evaluateReceiptRequest.js');
const DistributionLastNodeRequest = require('../models/distributionLastNodeRequest.js');
const EvaluateReceiversRequest = require('../models/evaluateReceiversRequest.js');
const GetTraderRequest = require('../models/getTraderRequest.js');
const GetTARequest = require('../models/getTARequest.js');
const Utils = require('../resources/Utils.js');

async function distribution(requestDistribution) {
    let dataModel = new DataModel(null, null, null);

    console.log('****************************');
    console.log('Request Distribution in Distribution EndPoint');
   // console.log(requestDistribution);
    try {
        let trackId = requestDistribution.trackId;
        let uploaderId = requestDistribution.uploaderId;
        let datetime = requestDistribution.datetime;
        let fromAddress = requestDistribution.fromAddress;
        let gasLimit = requestDistribution.gasLimit;

        let track = await trackEndpoint.getTrack(trackId, fromAddress, gasLimit);

        let evaluateReceiversFirstTimeRequest = new EvaluateReceiversRequest(
            trackId,
            uploaderId,
            track.revenue,
            datetime,
            "none",
            "none",
            uploaderId,
            fromAddress,
            gasLimit,
            true
        );

        let receiverShareFirstTimeList = await this.evaluateReceivers(evaluateReceiversFirstTimeRequest);
        console.log('RESULT RECEIVERS SHARE FIRST TIME');
        console.log(receiverShareFirstTimeList);

        if (receiverShareFirstTimeList.length == 0) {
            let onHoldDistributionRequest = new OnHoldDistributionRequest(
                trackId,
                uploaderId,
                datetime,
                track.revenue,
                fromAddress,
                gasLimit
            );
            await this.onHoldDistribution(onHoldDistributionRequest);

        } else if (receiverShareFirstTimeList.length >= 1) {
            for (const element of receiverShareFirstTimeList) {
                let distributionProcessRequest = new DistributionProcessRequest(
                    trackId,
                    element.agreementId,
                    element.traderReceiverId,
                    datetime,
                    element.ammount,
                    uploaderId,
                    uploaderId,
                    element.percentageReceiver,
                    fromAddress,
                    gasLimit,
                );
                await this.distributionProcess(distributionProcessRequest);
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
module.exports.distribution = distribution;


async function distributionProcess(
    distributionProcessRequest
) {
    console.log('*****************************************');
    console.log('Request Distribution Process in Distribution Endpoint');
  //  console.log(distributionProcessRequest);

    try {
        let trackId = distributionProcessRequest.trackId;
        let previousAgreementId = distributionProcessRequest.previousAgreementId;
        let emitterId = distributionProcessRequest.emitterId;
        let datetime = distributionProcessRequest.datetime;
        let ammount = distributionProcessRequest.shareAmmount;
        let previousEmitterId = distributionProcessRequest.previousEmitterId;
        let uploaderId = distributionProcessRequest.uploaderId;
        let percentageReceiver = distributionProcessRequest.percentageReceiver;
        let fromAddress = distributionProcessRequest.fromAddress;
        let gasLimit = distributionProcessRequest.gasLimit;
        let distributionProcessNewRequest;
        console.log('PREVIOUS EMITTERS');
        console.log(previousEmitterId);
        //assuming there is just one previous emitter
        let evaluateReceiversRequest = new EvaluateReceiversRequest(
            trackId,
            emitterId,
            ammount,
            datetime,
            previousEmitterId,
            previousAgreementId,
            uploaderId,
            fromAddress,
            gasLimit,
            false
        );
        let receiverList = await this.evaluateReceivers(evaluateReceiversRequest);
        console.log('EVALUATE RECEIVERS SHARE IN DISTRIBUTION PROCESS');
        console.log(receiverList);
        //Continue
        if (receiverList.length == 0) {
            let distributionLastNodeRequest = new DistributionLastNodeRequest(
                previousEmitterId,
                emitterId,
                trackId,
                percentageReceiver,
                ammount,
                datetime,
                uploaderId,
                previousAgreementId,
                fromAddress, //TODO: Mention how we had to use constantly address and gas
                gasLimit
            );
            await this.distributionLastNode(distributionLastNodeRequest);

        } else if (receiverList.length == 1) {
            console.log('ENTERED EVALUATION OF RECEIPTS********************');
            let uniqueShare = receiverList[0];

            //We get the agreement contract address
            let agreementContractAddressData = await agreementEndpoint.getAgreementContractAddress();
            let agreementContractAddress = agreementContractAddressData.data.replace(/\"/g, "");

            let evaluateReceiptRequestBackward = new EvaluateReceiptRequest(
                uniqueShare.agreementId,
                previousEmitterId,
                uniqueShare.traderEmitterId,
                trackId,
                datetime,
                agreementContractAddress,
                fromAddress,
                gasLimit
            );
            //TODO:Get receipt by other parameters, maybe is not necesary receiptId
            let receiptsBackwards = await this.evaluateReceipt(evaluateReceiptRequestBackward);

            let evaluateReceiptRequestForward = new EvaluateReceiptRequest(
                uniqueShare.agreementId,
                uniqueShare.traderEmitterId,
                uniqueShare.traderReceiverId,
                trackId,
                datetime,
                agreementContractAddress,
                fromAddress,
                gasLimit
            );
            let receiptsForwards = await this.evaluateReceipt(evaluateReceiptRequestForward);

            if (!((receiptsBackwards + receiptsForwards) > 1)) {
                distributionProcessNewRequest = new DistributionProcessRequest(
                    trackId,
                    uniqueShare.agreementId,
                    uniqueShare.traderReceiverId,
                    datetime,
                    uniqueShare.ammount,
                    uniqueShare.traderEmitterId,
                    uploaderId,
                    uniqueShare.percentageReceiver,
                    fromAddress,
                    gasLimit
                );

                this.distributionProcess(distributionProcessNewRequest);
            } else {
                console.log('NODE FINISHED**********************************');
            }
        } else if (receiverList.length > 1) {
            let uniqueShare = receiverList[0];
            for (const element of receiverList) {
                distributionProcessNewRequest = new DistributionProcessRequest(
                    trackId,
                    element.agreementId,
                    element.traderReceiverId,
                    datetime,
                    element.ammount,
                    uniqueShare.traderEmitterId,
                    uploaderId,
                    element.percentageReceiver,
                    fromAddress,
                    gasLimit
                );
                this.distributionProcess(distributionProcessNewRequest);
            }
        }
    } catch (error) {
        console.log('ERROR IN TRANSACTION DISTRIBUTION PROCESS');
        console.log(error);
        throw new Error(error);
    }
}
module.exports.distributionProcess = distributionProcess;

/**
 *All the parameters must come from a result from the blockchain call   
 */
async function distributionLastNode(distributionLastNodeRequest) {

    console.log('*************************************');
    console.log('Distribution Last Node in Composer.js');
  //  console.log(distributionLastNodeRequest);
    //TODO: Improve logs
    try {
        let emitterId = distributionLastNodeRequest.emitterId;
        let receiverId = distributionLastNodeRequest.receiverId;
        let trackId = distributionLastNodeRequest.trackId;
        let percentageReceiver = distributionLastNodeRequest.percentageReceiver;
        let ammount = distributionLastNodeRequest.ammount;
        let datetime = distributionLastNodeRequest.datetime;
        let previousAgreementId = distributionLastNodeRequest.previousAgreementId;
        let fromAddress = distributionLastNodeRequest.fromAddress;
        let gasLimit = distributionLastNodeRequest.gasLimit;

        //validate last time emitter and receiver 
        //TODO:
        //We get the receiver token account
        let getTARequest = new GetTARequest(
            receiverId,
            fromAddress,
            gasLimit
        );
        let tokenAccountReceiverRaw = await tokenAccountEndpoint.getTokenAccount(
            getTARequest
        );
        console.log(tokenAccountReceiverRaw);
        let tokenAccountReceiver = JSON.parse(tokenAccountReceiverRaw.data);
        console.log(tokenAccountReceiver);
        console.log('**************LAST NODE DISTRIBUTION*********************');
        console.log('Trader: ' + receiverId);
        console.log("Previous Trader Receiver Balance Enabled: ");
        console.log(tokenAccountReceiver.balanceEnabled);

        let ammountToAddReceiver = parseFloat(ammount);
        let flagBalanceAdded = await tokenAccountEndpoint.addEnabledBalance(
            receiverId,
            Math.round(ammountToAddReceiver),
            fromAddress,
            gasLimit
        );
        if (flagBalanceAdded) {
            console.log("Update Trader Receiver Balance Enabled: ");
            console.log(parseFloat(tokenAccountReceiver.balanceEnabled) + parseFloat(ammountToAddReceiver));
            let receiptUniqueId = new Date().getUTCMilliseconds();

            await receiptEndpoint.createReceipt(
                receiptUniqueId,
                trackId,
                Math.round(ammountToAddReceiver),
                previousAgreementId,
                String(datetime),
                fromAddress,
                gasLimit
            );
        } else {
            console.log('Balance not added something went wrong');
        }
    } catch (error) {
        console.log('ERROR IN TRANSACTION EVALUATE RECEIPT');
        throw new Error(error);
    }
}
module.exports.distributionLastNode = distributionLastNode;

async function evaluateReceipt(
    evaluateReceiptRequest
) {
    console.log('************************************');
    console.log('Evaluate Receipt in Composer.js: ');
   // console.log(evaluateReceiptRequest);

    try {
        let agreementId = evaluateReceiptRequest.agreementId;
        let traderEmitterId = evaluateReceiptRequest.traderEmitterId;
        let traderReceiverId = evaluateReceiptRequest.traderReceiverId;
        let trackId = evaluateReceiptRequest.trackId;
        let datetime = evaluateReceiptRequest.datetime;
        let agreementCtrAddr = evaluateReceiptRequest.agreementCtrAddr;
        let fromAddress = evaluateReceiptRequest.fromAddress;
        let gasLimit = evaluateReceiptRequest.gasLimit;

        let result = await receiptEndpoint.validateReceipt(
            agreementId,
            traderEmitterId,
            traderReceiverId,
            trackId,
            datetime,
            agreementCtrAddr,
            fromAddress,
            gasLimit
        );
        return result;
    } catch (error) {
        console.log('ERROR IN TRANSACTION EVALUATE RECEIPT');
        throw new Error(error);
    }
}
module.exports.evaluateReceipt = evaluateReceipt;

async function onHoldDistribution(
    requestOnHoldDistribution
) {
    console.log('************************************');
    console.log('Request On Hold Distribution in Composer.js: ');
    //console.log(requestOnHoldDistribution);

    try {
        let trackId = requestOnHoldDistribution.trackId;
        let uploaderId = requestOnHoldDistribution.uploaderId;
        let datetime = requestOnHoldDistribution.datetime;
        let revenueTotal = requestOnHoldDistribution.ammount;
        let fromAddress = requestOnHoldDistribution.fromAddress;
        let gasLimit = requestOnHoldDistribution.gasLimit;

        await tokenAccountEndpoint.addDisabledBalance(
            uploaderId,
            revenueTotal,
            fromAddress,
            gasLimit
        );

        //We create the receipt
        let receiptUniqueId = new Date().getUTCMilliseconds();

        await receiptEndpoint.createReceipt(
            receiptUniqueId,
            trackId,
            revenueTotal,
            agreementId,
            datetime,
            fromAddress,
            gasLimit
        );
    } catch (error) {
        console.log('ERROR IN TRANSACTION ON HOLD DISTRIBUTION');
        throw new Error(error);
    }
}
module.exports.onHoldDistribution = onHoldDistribution;

async function evaluateReceivers(request) {
    console.log('*************************************');
    console.log('Request Evaluate Receivers in Distribution Endpoint.js');
   // console.log(request);
    try {
        let shareTotal = 1;
        let previousReceiverId = request.previousReceiverId;
        let previousReceiverModel;
        let fromAddress = request.fromAddress;
        let gasLimit = request.gasLimit;
        let emitterId = request.emitterId;
        let datetime = request.datetime;
        let previousAgreementId = request.previousAgreementId;
        let revenueTotalInput = request.revenue;
        let trackId = request.trackId;
        let getTraderRequest;

        getTraderRequest = new GetTraderRequest(emitterId, fromAddress, gasLimit);

        let emitterRaw = await traderEndpoint.getTrader(
            getTraderRequest
        );
        if (previousReceiverId && previousReceiverId != "none") {
            getTraderRequest = new GetTraderRequest(previousReceiverId, fromAddress, gasLimit);
            previousReceiverModel = await traderEndpoint.getTrader(
                getTraderRequest
            );
            previousReceiverId = previousReceiverModel.traderId;

        } else {
            console.log('FIRST RECEIVER*******************');
            previousReceiverId = fromAddress;
        }
        let emitterModel = JSON.parse(emitterRaw.data);
        //Get all agreements between emitter and receiver
        let agreements = await agreementEndpoint.getAgreementsByEmitter(
            emitterModel.traderId,
            fromAddress,
            gasLimit
        );

        //TODO: For each agremeent get the entire structure 
        //TODO: DataModel Response
        console.log("LIST OF AGREEMENTS**************************");
        console.log(agreements);

        let receiverShareListResult = [];
        if (agreements && agreements.length > 0) {
            //first we create a raw list of agreements
            let rawListAgreements = [];

            for (const element of agreements) {
                let currentAgreement = await agreementEndpoint.getAgreement(
                    element,
                    fromAddress,
                    gasLimit
                );
                rawListAgreements.push(currentAgreement);
            }
  
            //Now we filter by possible duplicated tracks
            let filteredAgreements = await this.removeAgreementsByTrack(rawListAgreements);
            //filteredAgreements = Utils.removeDuplicatesProp(filteredAgreements, 'traderReceiverId');


            for (const element of filteredAgreements) {
                let currentAgreement = element;
                shareTotal =
                    parseFloat(shareTotal) - parseFloat(currentAgreement.percentage);
                if (shareTotal < 0) {
                    throw "Total percentage exceded permited share";
                }

                let receiverShareAmmount =
                    parseFloat(revenueTotalInput) * parseFloat(currentAgreement.percentage);

                let currentShareModel = new ReceiverShareModel(
                    currentAgreement.agreementId,
                    currentAgreement.traderEmitterId,
                    currentAgreement.traderReceiverId,
                    Math.round(receiverShareAmmount),
                    currentAgreement.percentage,
                    datetime
                );
                receiverShareListResult.push(currentShareModel);
            }

            console.log('SHARE TOTAL');
            console.log(shareTotal);
            console.log("REVENUE");
            console.log(revenueTotalInput);
            //Now we distribute the emitter its share
            let ammountToAddEmitter =
                parseFloat(shareTotal) * parseFloat(revenueTotalInput);

            console.log('AMMOUNT TO ADD');
            console.log(ammountToAddEmitter);


            await tokenAccountEndpoint.addEnabledBalance(
                emitterId,
                Math.round(ammountToAddEmitter),
                fromAddress,
                gasLimit
            );

            let receiptUniqueId = new Date().getUTCMilliseconds();

            //Now we create the receipt
            if (!request.firstDistFlag) {
                await receiptEndpoint.createReceipt(
                    receiptUniqueId,
                    trackId,
                    Math.round(ammountToAddEmitter),
                    previousAgreementId, //lets test this
                    String(datetime),
                    fromAddress,
                    gasLimit
                );
            }
        } else {
            console.log("No receivers for this trader: " + emitterModel.name);
        }
        return receiverShareListResult;
    } catch (error) {
        console.log('ERROR IN TRANSACTION EVALUATE RECEIVERS');
        throw new Error(error);
    }
}
module.exports.evaluateReceivers = evaluateReceivers;


async function removeAgreementsByTrack(agreementList) {
    try {
        let result = [];
        let filteredListByTrack=[];
        let filteredListByReceiver = Utils.removeDuplicatesProp(agreementList, "traderReceiverId");

        if (filteredListByReceiver.length < agreementList.length) {
            //validate remove duplicates
            filteredListByTrack = Utils.removeDuplicatesProp(agreementList, 'trackId');

            if (filteredListByTrack.length < agreementList.length) {
                result = filteredListByTrack;
            } else {
                result = filteredListByReceiver;
            }
        } else {
            result = agreementList;
        }
        return result;
    } catch (error) {
        console.log('ERROR IN REMOVE AGREEMENTS BY TRACK');
        throw new Error(error);
    }
}
module.exports.removeAgreementsByTrack = removeAgreementsByTrack;