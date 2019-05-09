class EvaluateReceiversRequest {

    constructor(
        isrc,
        emiterId,
        shareAmmount,
        datetime,
        previousReceiverId,
        previousAgreementId,
        uploaderId
    ) {
        this.isrc = isrc;
        this.emiterId = emiterId;
        this.shareAmmount = shareAmmount;
        this.datetime=datetime;
        this.previousReceiverId=previousReceiverId;
        this.previousAgreementId=previousAgreementId;
        this.uploaderId=uploaderId;
    }
}
module.exports = EvaluateReceiversRequest;