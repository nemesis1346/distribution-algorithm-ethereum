class ManualPaymentRequest {
    
    constructor(
        isrc,
        traderId) {
        this.isrc = isrc;
        this.traderId = traderId;
    }
}
module.exports = ManualPaymentRequest;