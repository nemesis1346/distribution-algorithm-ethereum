class DistributionProcessRequest {
    constructor(
        isrc,
        emiterId,
        datetime,
        shareAmmount,
        previousEmitersArray,
        percentageReceiver,
        previousAgreementId,
        uploaderId
    ) {
        this.isrc = isrc;
        this.emiterId = emiterId;
        this.datetime=datetime;
        this.shareAmmount=shareAmmount;
        this.previousEmitersArray=previousEmitersArray;
        this.percentageReceiver=percentageReceiver;
        this.previousAgreementId = previousAgreementId;
        this.uploaderId=uploaderId;
    }
}

module.exports = DistributionProcessRequest;
