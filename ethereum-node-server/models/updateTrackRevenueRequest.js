class UpdateTrackRevenueRequest {

    constructor(
       trackId,
       revenue,
       fromAddress,
       gasLimit
    ) {
        this.trackId = trackId;
        this.revenue = revenue;
        this.fromAddress = fromAddress;
        this.gasLimit = gasLimit;

    }
}
module.exports = UpdateTrackRevenueRequest;