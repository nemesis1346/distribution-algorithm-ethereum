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

async function distribution(
    trackId,
    uploaderId,
    datetime,
    fromAddress,
    gasLimit
) {
    try{
        let track = await trackEndpoint.getTrack(trackId, fromAddress, gasLimit);
        console.log("TRACK RESULT IN DISTRIBUTION");
        console.log(track);
        let receiverShareFirstTimeList = await this.evaluateReceivers(
            trackId,
            uploaderId,
            track.revenueTotal,
            datetime,
            "none",
            fromAddress,
            uploaderId,
            fromAddress,
            gasLimit
        );
        console.log('RECEIVER EVALUATION FINISHED');
        //just test
        console.log(receiverShareFirstTimeList);
    
        if (receiverShareFirstTimeList.length == 0) {
            await this.onHoldDistribution(
                trackId,
                uploaderId,
                datetime,
                track.revenueTotal
            );
    
        } else if (receiverShareFirstTimeList.length >= 1) {
            for (const element of receiverShareFirstTimeList) {
                await this.distributionProcess(
                    trackId,
                    element.agreementId,
                    element.traderEmitterId,
                    datetime,
                    track.revenueTotal,
                    uploaderId,
                    uploaderId,
                    fromAddress,
                    gasLimit
                );
            }
        }
        console.log('PROCESS FINISHED');
    }catch(error){
        console.log(error);
    }
}
module.exports.distribution = distribution;


async function distributionProcess(
    trackId,
    previousAgreementId,
    emitterId,
    datetime,
    ammount,
    previousEmitterId,
    uploaderId,
    fromAddress,
    gasLimit
) {
    //assuming there is just one previous emitter
    let receiverList = await this.evaluateReceivers(
        trackId,
        emitterId,
        ammount,
        datetime,
        previousEmitterId,
        previousAgreementId,
        uploaderId,
        fromAddress,
        gasLimit
    );
    console.log('EVALUATE RECEIVERS IN DISTRIBUTION PROCESS');
    console.log(receiverList);

}
module.exports.distributionProcess = distributionProcess;

async function evaluateReceivers(
    tracKId,
    emitterId,
    revenueTotalInput,
    datetime,
    previousReceiverId,
    previousAgreementId,
    uploaderId,
    fromAddress,
    gasLimit
) {
    console.log('ENTERS INTO EVALUTER RECEIVERS');
    console.log(emitterId);
    let shareTotal = 1;

    let emitter = await traderEndpoint.getTrader(
        emitterId,
        fromAddress,
        gasLimit
    );
    console.log("EMITTER RESULT IN EVALUATE RECEIVERS");
    console.log(emitter);
    if (previousReceiverId && previousReceiverId != "none") {
        previousReceiver = await traderEndpoint.getTrader(
            previousReceiverId,
            fromAddress,
            gasLimit
        );
        previousReceiverId = previousReceiver.traderId;
        console.log("PREVIOUS RECEIVER ID IN EVALUATE RECEIVERS");
        console.log(previousReceiver);
    } else {
        previousReceiverId = fromAddress;
    }
    //Get all agreements between emitter and receiver
    let agreements = await agreementEndpoint.getAgreementsByEmitter(
        emitter.traderId,
        fromAddress,
        gasLimit
    );
    console.log("LIST OF AGREEMENTS");
    console.log(agreements);

    let receiverShareListResult = [];
    if (agreements && agreements.length > 0) {
        for (const element of agreements) {
            let currentAgreement = await agreementEndpoint.getAgreement(
                element,
                fromAddress,
                gasLimit
            );
            console.log(currentAgreement.percentage);
            shareTotal =
                parseFloat(shareTotal) - parseFloat(currentAgreement.percentage);
            if (shareTotal < 0) {
                throw "Total percentage exceded permited share";
            }

            let receiverShareAmmount =
                parseFloat(revenueTotalInput) * parseFloat(currentAgreement.percentage);
            console.log("RECEIVER SHARE AMMOUNT");
            console.log(receiverShareAmmount);
            console.log('CURRENT AGREEMENT');
            console.log(currentAgreement);
            let currentShareModel = new ReceiverShareModel(
                currentAgreement.agreementId,
                currentAgreement.traderEmiterId,
                currentAgreement.traderReceiverId,
                Math.round(receiverShareAmmount),
                currentAgreement.percentage
            );
            receiverShareListResult.push(currentShareModel);
        }

        //Now we distribute the emitter its share
        let ammountToAddEmiter =
            parseFloat(shareTotal) * parseFloat(revenueTotalInput);

        await tokenAccountEndpoint.addEnabledBalance(
            emitterId,
            Math.round(ammountToAddEmiter),
            fromAddress,
            gasLimit
        );
        let receiptUniqueId = new Date().getUTCMilliseconds();

        //Now we create the receipt
        await receiptEndpoint.createReceipt(
            receiptUniqueId,
            tracKId,
            Math.round(ammountToAddEmiter),
            previousAgreementId, //lets test this
            String(datetime),
            fromAddress,
            gasLimit
        );
    } else {
        console.log("No receivers for this trader: " + emiter.name);
    }
    return receiverShareListResult;
}
module.exports.evaluateReceivers = evaluateReceivers;

async function onHoldDistribution(
    trackId,
    uploaderId,
    datetime,
    revenueTotal,
    fromAddress,
    agreementId
) {
    console.log('GETTING HERE');
    await tokenAccountEndpoint.addDisabledBalance(
        uploaderId,
        revenueTotal,
        fromAddress,
        gasLimit
    );

    console.log('ON HOLD DISTRIBUTION SUCCESSFUL');
    //We craete teh receipt
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

    console.log('RECEIPT CREATED');
}
module.exports.onHoldDistribution = onHoldDistribution;
