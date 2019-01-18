export class TokenAccountModel {
    public tokenAccountId;
    public balanceEnabled;
    public balanceDisabled;

    constructor(
        tokenAccountId: string,
        balanceEnabled: string,
        balanceDisabled: string) {
        this.tokenAccountId = tokenAccountId;
        this.balanceEnabled = balanceEnabled;
        this.balanceDisabled = balanceDisabled;
    }
}