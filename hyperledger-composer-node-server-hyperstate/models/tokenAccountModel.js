class TokenAccountModel {

    constructor(
        tokenAccountId,
        balanceEnabled,
        balanceDisabled,
        percentage,
        status,
        isrc) {
        this.tokenAccountId = tokenAccountId;
        this.balanceEnabled = balanceEnabled;
        this.balanceDisabled = balanceDisabled;
        this.percentage = percentage;
        this.status = status;
        this.isrc = isrc;
    }
}
module.exports = TokenAccountModel;