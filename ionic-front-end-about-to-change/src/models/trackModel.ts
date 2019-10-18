export class TrackModel {
    public isrc;
    public title;
    public revenueTotal;
    public vendorIdentifier;
    public label;
    public author;
    public ownerType;
    public uploaderId;

    constructor(
        isrc: string,
        title: string,
        revenueTotal: number,
        vendorIdentifier: string,
        label: string,
        author: string,
        ownerType: string,
        uploaderId: string
    ) {
        this.isrc = isrc;
        this.title = title;
        this.revenueTotal = revenueTotal;
        this.vendorIdentifier = vendorIdentifier;
        this.label = label;
        this.author = author;
        this.ownerType = ownerType;
        this.uploaderId = uploaderId;
    }
}