class EvaluateReceiversRequest {

    constructor(
        trackId,
        emitterId,
        revenue,
        datetime,
        previousReceiverId,
        previousAgreementId,
        uploaderId,
        fromAddress,
        gasLimit
    ) {
        this.trackId = trackId;
        this.emitterId = emitterId;
        this.revenue = revenue;
        this.datetime=datetime;
        this.previousReceiverId=previousReceiverId;
        this.previousAgreementId=previousAgreementId;
        this.uploaderId=uploaderId;
        this.fromAddress = fromAddress;
        this.gasLimit=gasLimit;
    }
}
module.exports = EvaluateReceiversRequest;