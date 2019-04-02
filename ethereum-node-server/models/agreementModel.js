class AgreementModel {
    constructor(
        agreementId,
        traderEmiterId,
        traderReceiverId,
        percentage,
        trackId,
    ) {
        this.agreementId = agreementId;
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.percentage = percentage;
        this.trackId=trackId;
    }
}

module.exports = AgreementModel;