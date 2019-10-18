class AgreementModel {
    constructor(
        agreementId,
        traderEmitterId,
        traderReceiverId,
        percentage,
        trackId,
    ) {
        this.agreementId = agreementId;
        this.traderEmitterId = traderEmitterId;
        this.traderReceiverId = traderReceiverId;
        this.percentage = percentage;
        this.trackId=trackId;
    }
}

module.exports = AgreementModel;