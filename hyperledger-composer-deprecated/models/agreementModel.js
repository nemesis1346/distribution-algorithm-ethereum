class AgreementModel {
    constructor(
        agreementId,
        traderEmiterId,
        traderReceiverId,
        percentage,
        status,
        isrc,
        traderEmiterName,
        traderReceiverName
    ) {
        this.agreementId = agreementId;
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.percentage = percentage;
        this.status= status;
        this.isrc=isrc;
        this.traderEmiterName = traderEmiterName;
        this.traderReceiverName=traderReceiverName;
    }
}

module.exports = AgreementModel;