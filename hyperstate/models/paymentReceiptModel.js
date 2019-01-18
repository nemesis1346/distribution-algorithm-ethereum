class PaymentReceiptModel {

    constructor(
        paymentReceiptId,
        isrc,
        ammount,
        traderEmiterId,
        traderReceiverId,
        paymentReceiptType,
        agreementId,
        paymentReceiptStatus,
        traderEmiterName,
        traderReceiverName,
        datetime,
        uploaderId,
        percentageReceiver) {
        this.paymentReceiptId=paymentReceiptId;
        this.isrc = isrc;
        this.ammount = ammount;
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.paymentReceiptType = paymentReceiptType;
        this.agreementId = agreementId;
        this.paymentReceiptStatus = paymentReceiptStatus;
        this.traderEmiterName = traderEmiterName;
        this.traderReceiverName = traderReceiverName;
        this.datetime=datetime;
        this.uploaderId=uploaderId;
        this.percentageReceiver = percentageReceiver;
    }
}
module.exports = PaymentReceiptModel;