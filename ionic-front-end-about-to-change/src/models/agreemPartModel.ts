//This model is for the front end manage of traders for creating an agreement
export class AgreemPartModel {
    public traderId;
    public name;
    public balance;
    public traderType;
    public tokenAccount;
    public percentage; //this is for the percentage of royalties in the agreement
    constructor(
        traderId: string,
        name: string,
        balance: number,
        traderType: string,
        tokenAccount: string,
        percentage: string) {
        this.traderId = traderId;
        this.name = name;
        this.balance = balance;
        this.traderType = traderType;
        this.tokenAccount = tokenAccount;
        this.percentage = percentage;
    }
}