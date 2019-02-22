export class WithdrawRequest {
    public traderId;
    public tokenAccountId;
    public ammount;

    constructor(
        traderId: string,
        tokenAccountId: string,
        ammount: string
    ) {
        this.traderId = traderId;
        this.tokenAccountId = tokenAccountId;
        this.ammount = ammount;

    }
}