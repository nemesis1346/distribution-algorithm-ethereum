const contractTruffle = require("truffle-contract");
const Web3 = require("web3");
const web3Provider = new Web3(
  new Web3.providers.HttpProvider("http://localhost:7545")
);
const trackEndpoint = require("./trackEndpoint");
const traderEndpoint = require("./traderEndpoint");
const agreementEndpoint = require("./agreementEndpoint");
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
  let track = await trackEndpoint.getTrack(trackId, fromAddress, gasLimit);
  console.log("TRACK RESULT IN DISTRIBUTION");
  console.log(track);
  this.evaluateReceivers(
    trackId,
    uploaderId,
    track.revenueTotal,
    datetime,
    "none",
    "none",
    uploaderId,
    fromAddress,
    gasLimit
  );
}
module.exports.distribution = distribution;

async function evaluateReceivers(
  tracKId,
  emitterId,
  revenueTotalInput,
  datetime,
  previousReceiverId,
  previousAgreement,
  uploaderId,
  fromAddress,
  gasLimit
) {
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
    previousReceiverId = "none";
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
        "6721975"
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
      let currentShareModel = new ReceiverShareModel(
        element.agreementId,
        element.traderEmiterId,
        element.traderReceiverId,
        receiverShareAmmount,
        elemenet.percentageReceiver
      );
      receiverShareListResult.push(currentShareModel);

      //Now we distribute the emitter its share
      //TODO: set this up for ethereum
      let ammountToAddEmiter =
        parseFloat(shareTotal) * parseFloat(shareAmmount);
      let tokenAccountEmiter = await tokenRegistry.get(emiter.tokenAccountId);
      tokenAccountEmiter.balanceEnabled =
        parseFloat(tokenAccountEmiter.balanceEnabled) +
        parseFloat(ammountToAddEmiter);
      await tokenRegistry.update(tokenAccountEmiter);
    }
  } else {
    console.log("No receivers for this trader: " + emiter.name);
  }
  return receiverShareListResult;
}
module.exports.evaluateReceivers = evaluateReceivers;

async function onHoldDistribution() {}
module.exports.onHoldDistribution = onHoldDistribution;
async function distributionProcess() {}
module.exports.distributionProcess = distributionProcess;
