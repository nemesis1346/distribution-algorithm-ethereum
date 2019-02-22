export class GetTxByStatusTypeTraderRequest{
    public traderEmiterId;
    public traderReceiverId;
    public paymentReceiptStatus;
    public paymentReceiptType;

    constructor(
        traderEmiterId: string,
        traderReceiverId:string,
        paymentReceiptStatus: string,
        paymentReceiptType: string) {
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.paymentReceiptStatus = paymentReceiptStatus;
        this.paymentReceiptType = paymentReceiptType;
    }
}