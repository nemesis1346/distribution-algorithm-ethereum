class CreateTraderRequest {
    constructor(
        traderId,
        name,
        tokenAccountId,
        TAContractAddress,
        fromAddress,
        gasLimit) {
        this.traderId = traderId;
        this.name = name;
        this.tokenAccountId = tokenAccountId;
        this.TAContractAddress = TAContractAddress;
        this.fromAddress = fromAddress;
        this.gasLimit=gasLimit;
    }
}

module.exports = CreateTraderRequest;

