export class ManualPaymentRequest {
    public isrc;
    public traderId;

    constructor(
        isrc: string,
        traderId: string) {
        this.isrc = isrc;
        this.traderId = traderId;
    }
}