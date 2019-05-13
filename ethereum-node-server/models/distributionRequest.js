class DistributionRequest {
    constructor(
        trackId,
        uploaderId,
        datetime,
        fromAddress,
        gasLimit
    ) {
        this.trackId = trackId;
        this.uploaderId = uploaderId;
        this.datetime=datetime;
        this.fromAddress=fromAddress;
        this.gasLimit=gasLimit;
    }
}

module.exports = DistributionRequest;
