export class PaymentReceiptModel {
    public paymentReceiptId;
    public isrc;
    public ammount;
    public traderEmiterId;
    public traderReceiverId;
    public paymentReceiptType;
    public agreementId;
    public paymentReceiptStatus;
    public traderEmiterName;
    public traderReceiverName;

    constructor(
        paymentReceiptId: string,
        isrc: string,
        ammount: string,
        traderEmiterId: string,
        traderReceiverId: string,
        paymentReceiptType: string,
        agreementId: string,
        paymentReceiptStatus: string,
        traderEmiterName: string,
        traderReceiverName: string) {
        this.paymentReceiptId = paymentReceiptId;
        this.isrc = isrc;
        this.ammount = ammount;
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.paymentReceiptType = paymentReceiptType;
        this.agreementId = agreementId;
        this.paymentReceiptStatus = paymentReceiptStatus;
        this.traderEmiterName = traderEmiterName,
            this.traderReceiverName = traderReceiverName;
    }
}
