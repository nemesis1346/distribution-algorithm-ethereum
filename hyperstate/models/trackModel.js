class TrackModel {

    constructor(
        isrc,
        title,
        revenueTotal,
        vendorIdentifier,
        label,
        author,
        ownerType,
        uploaderId) {
        this.isrc = isrc;
        this.title = title;
        this.revenueTotal = revenueTotal;
        this.vendorIdentifier = vendorIdentifier;
        this.label = label;
        this.author = author;
        this.ownerType = ownerType;
        this.uploaderId=uploaderId
    }
}
module.exports = TrackModel;