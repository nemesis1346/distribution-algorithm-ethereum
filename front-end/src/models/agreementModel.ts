export class AgreementModel {
    public agreementId;
    public traderEmiterId;
    public traderReceiverId;
    public percentage;
    public status;
    public isrc;
    public traderEmiterName;
    public traderReceiverName;

    constructor(
        agreementId: string,
        traderEmiterId: string,
        traderReceiverId: string,
        percentage: string,
        status: string,
        isrc: string,
        traderEmiterName: string,
        traderReceiverName: string
    ) {
        this.agreementId = agreementId;
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.percentage = percentage;
        this.status = status;
        this.isrc = isrc;
        this.traderEmiterName = traderEmiterName;
        this.traderReceiverName = traderReceiverName;
    }
}