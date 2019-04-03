class ReceiverShareModel {

    constructor(
        agreementId,
        traderEmitterId,
        traderReceiverId,
        ammount,
        percentageReceiver, //This is not used, is just information
        datetime  //why do u need this?
    ) {
        this.agreementId = agreementId;
        this.traderEmitterId = traderEmitterId;
        this.traderReceiverId = traderReceiverId;
        this.ammount = ammount;
        this.percentageReceiver = percentageReceiver;
        this.datetime = datetime;
    }
}
module.exports = ReceiverShareModel;