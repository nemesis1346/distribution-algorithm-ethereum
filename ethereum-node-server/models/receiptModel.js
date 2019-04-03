class ReceiptModel {

    constructor(
        receiptId,
        trackId,
        ammount,
        agreementId,
        datetime) {

        this.receiptId = receiptId;
        this.trackId = trackId;
        this.ammount = ammount;
        this.agreementId = agreementId;
        this.datetime = datetime;
    }
}
module.exports = ReceiptModel;