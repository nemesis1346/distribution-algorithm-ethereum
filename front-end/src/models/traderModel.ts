export class TraderModel {
    public traderId;
    public name;
    public email;
    public balance;
    public traderType;
    public tokenAccountId;
    constructor(
        traderId: string,
        name: string,
        email: string,
        balance: number,
        traderType: string,
        tokenAccountId: string) {
        this.traderId = traderId;
        this.name = name;
        this.email = email;
        this.balance = balance;
        this.traderType = traderType;
        this.tokenAccountId = tokenAccountId;
    }
}