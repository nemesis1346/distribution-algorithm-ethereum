class DistributionProcessRequest {
    constructor(
        trackId,
        previousAgreementId,
        emitterId,
        datetime,
        shareAmmount,
        previousEmitterId,
        uploaderId,
        percentageReceiver,
        fromAddress,
        gasLimit
    ) {
        this.trackId = trackId;
        this.emitterId = emitterId;
        this.datetime=datetime;
        this.shareAmmount=shareAmmount;
        this.previousEmitterId=previousEmitterId;
        this.percentageReceiver=percentageReceiver;
        this.previousAgreementId = previousAgreementId;
        this.uploaderId=uploaderId;
        this.fromAddress =fromAddress;
        this.gasLimit = gasLimit;
    }
}
module.exports = DistributionProcessRequest;
