class TraderModel {
    constructor(
        traderId,
        name,
        email,
        balance,
        traderType,
        tokenAccountId) {
        this.traderId = traderId;
        this.name = name;
        this.email = email;
        this.balance = balance;
        this.traderType = traderType;
        this.tokenAccountId = tokenAccountId;
    }
}

module.exports = TraderModel;

