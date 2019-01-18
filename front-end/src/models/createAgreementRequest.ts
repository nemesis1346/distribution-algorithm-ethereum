export class CreateAgreementRequest {
    public agreementId: string;
    public isrc: string;
    public traderEmiterId: string;
    public traderReceiverId: string;
    public percentage: string;
    public status: string;
    public traderEmiterName: string;
    public traderReceiverName: string;
    public datetime:string;

    constructor(
        agreementId: string,
        isrc: string,
        traderEmiterId: string,
        traderReceiverId: string,
        percentage: string,
        status: string,
        traderEmiterName: string,
        traderReceiverName: string,
        datetime:string) {
        this.agreementId = agreementId;
        this.isrc = isrc;
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.percentage = percentage;
        this.status = status;
        this.traderEmiterName = traderEmiterName;
        this.traderReceiverName = traderReceiverName;
        this.datetime=this.datetime;
    }
}