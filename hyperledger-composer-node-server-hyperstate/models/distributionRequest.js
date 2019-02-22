class DistributionProcessRequest {
    constructor(
        isrc,
        uploaderId,
        datetime
    ) {
        this.isrc = isrc;
        this.uploaderId = uploaderId;
        this.datetime=datetime;
    }
}

module.exports = DistributionProcessRequest;
