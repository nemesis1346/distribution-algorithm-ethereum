class GetTraderRequest {
    constructor(
        traderId,
        fromAddress,
        gasLimit) {
        this.traderId = traderId;
        this.fromAddress = fromAddress;
        this.gasLimit = gasLimit;
    }
}

module.exports = GetTraderRequest;

