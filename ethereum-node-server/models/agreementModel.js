class AgreementModel {
    constructor(
        agreementId,
        traderEmiterId,
        traderReceiverId,
        percentage,
        isrc,
    ) {
        this.agreementId = agreementId;
        this.traderEmiterId = traderEmiterId;
        this.traderReceiverId = traderReceiverId;
        this.percentage = percentage;
        this.isrc=isrc;
    }
}

module.exports = AgreementModel;