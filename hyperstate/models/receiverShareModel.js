class ReceiverShareModel {

    constructor(
        agreementId,
        traderEmiterId,
        traderReceiverId,
        traderEmiterName,
        traderReceiverName,
        ammount,
        percentageReceiver, //This is not used, is just information
        datetime  //why do u need this?
    ) {
        this.agreementId = agreementId;
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.traderEmiterName = traderEmiterName;
        this.traderReceiverName = traderReceiverName;
        this.ammount = ammount;
        this.percentageReceiver = percentageReceiver;
        this.datetime = datetime;
    }
}
module.exports = ReceiverShareModel;