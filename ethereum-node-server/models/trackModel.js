class TrackModel {

    constructor(
        trackId,
        isrc,
        title,
        revenue,
        uploaderId) {

        this.trackId = trackId;
        this.isrc = isrc;
        this.title = title;
        this.revenue = revenue;
        this.uploaderId = uploaderId
    }
}
module.exports = TrackModel;