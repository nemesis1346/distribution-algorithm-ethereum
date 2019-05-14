class OnHoldDistributionRequest {

    constructor(
        trackId,
        uploaderId,
        datetime,
        ammount,
        fromAddress,
        gasLimit) {
        this.trackId = trackId;
        this.uploaderId = uploaderId;
        this.datetime=  datetime;
        this.ammount=ammount;
        this.fromAddress = fromAddress;
        this.gasLimit =gasLimit;
    }
}
module.exports = OnHoldDistributionRequest;