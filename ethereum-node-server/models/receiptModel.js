class ReceiptModel {

    constructor(
        receiptId,
        trackId,
        ammount,
        traderEmitterId,
        traderReceiverId,
        agreementId,
        paymentStatus,
        datetime,
        uploaderId,
        percentageReceiver) {

        this.receiptId = receiptId;
        this.trackId = trackId;
        this.ammount = ammount;
        this.traderEmitterId = traderEmitterId;
        this.traderReceiverId = traderReceiverId;
        this.agreementId = agreementId;
        this.paymentStatus = paymentStatus;
        this.datetime = datetime;
        this.uploaderId = uploaderId;
        this.percentageReceiver = percentageReceiver;
    }
}
module.exports = ReceiptModel;