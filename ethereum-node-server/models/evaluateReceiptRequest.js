class EvaluateReceiptRequest {

    constructor(
        agreementId,
        traderEmitterId,
        traderReceiverId,
        trackId,
        datetime,
        agreementCtrAddr,
        fromAddress,
        gasLimit
        ) {
        this.agreementId = agreementId,
        this.traderEmitterId = traderEmitterId,
        this.traderReceiverId = traderReceiverId,
        this.trackId = trackId;
        this.datetime = datetime;
        this.agreementCtrAddr  =agreementCtrAddr;
        this.fromAddress = fromAddress;
        this.gasLimit = gasLimit;
    }
}
module.exports = EvaluateReceiptRequest;