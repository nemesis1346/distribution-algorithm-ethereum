class TrackModel {

    constructor(
        trackId,
        isrc,
        title,
        revenueTotal,
        uploaderId) {

        this.trackId = trackId;
        this.isrc = isrc;
        this.title = title;
        this.revenueTotal = revenueTotal;
        this.uploaderId = uploaderId
    }
}
module.exports = TrackModel;