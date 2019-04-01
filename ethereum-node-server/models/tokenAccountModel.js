class TokenAccountModel {

    constructor(
        tokenAccountId,
        balanceEnabled,
        balanceDisabled,
        ) {
        this.tokenAccountId = tokenAccountId;
        this.balanceEnabled = balanceEnabled;
        this.balanceDisabled = balanceDisabled;
    }
}
module.exports = TokenAccountModel;