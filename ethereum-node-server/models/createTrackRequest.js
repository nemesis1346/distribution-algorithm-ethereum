class CreateTrackRequest {

    constructor(
        trackId,
        isrc,
        title,
        revenue,
        fromAddress, 
        gasLimit) {
        this.trackId = trackId;
        this.isrc = isrc;
        this.title = title;
        this.revenue = revenue;
        this.fromAddress = fromAddress;
        this.gasLimit=gasLimit;
    }
}
module.exports = CreateTrackRequest;