class EvaluateReceiptRequest {
    
    constructor(
        agreementId,
        traderEmiterId,
        traderReceiverId,
        isrc,
        datetime
        ) {
        this.agreementId = agreementId,
        this.traderEmiterId = traderEmiterId,
        this.traderReceiverId = traderReceiverId,
        this.isrc = isrc;
        this.datetime = datetime;
    }
}
module.exports = EvaluateReceiptRequest;