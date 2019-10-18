class GetTARequest {
    constructor(
        tokenAccountId,
        fromAddress,
        gasLimit) {
        this.tokenAccountId = tokenAccountId;
        this.fromAddress = fromAddress;
        this.gasLimit = gasLimit;
    }
}

module.exports = GetTARequest;

