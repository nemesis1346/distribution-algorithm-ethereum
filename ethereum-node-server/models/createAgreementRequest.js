class CreateAgreementRequest {
    constructor(
        agreementId,
        emitterId,
        receiverId,
        percentage,
        trackId,
        traderContractAddress,
        trackContractAddress,
        fromAddress,
        gasLimit
    ) {
        this.agreementId = agreementId;
        this.emitterId = emitterId;
        this.receiverId = receiverId;
        this.percentage = percentage;
        this.trackId=trackId;
        this.traderContractAddress= traderContractAddress;
        this.trackContractAddress = trackContractAddress;
        this.fromAddress= fromAddress;
        this.gasLimit=gasLimit;
    }
}

module.exports = CreateAgreementRequest;