class DistributionlastNodeRequest {
    constructor(
        emitterId,
        receiverId,
        trackId,
        percentageReceiver,
        ammount,
        datetime,
        uploaderId,
        previousAgreementId,
        fromAddress,
        gasLimit
    ) {
        this.emitterId = emitterId;
        this.receiverId = receiverId;
        this.trackId=trackId;
        this.percentageReceiver = percentageReceiver;
        this.ammount = ammount;
        this.datetime=datetime;
        this.uploaderId=uploaderId;
        this.previousAgreementId=previousAgreementId;
        this.fromAddress=fromAddress;
        this.gasLimit = gasLimit;
    }
}

module.exports = DistributionlastNodeRequest;
