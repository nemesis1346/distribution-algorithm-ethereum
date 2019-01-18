export class PaymentDistRequest {
    public isrc;
    public uploaderId;

    constructor(
        isrc: string,
        uploaderId: string) {
        this.isrc = isrc;
        this.uploaderId = uploaderId;
    }
}