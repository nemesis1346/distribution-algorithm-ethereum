export class WithdrawalByTraderRequest {
    public traderId;
    public txList;
    public oweTotal;

    constructor(
        traderId: string,
        txList: string,
        oweTotal: string) {
        this.traderId = traderId;
        this.txList = txList;
        this.oweTotal = oweTotal;
    }
}