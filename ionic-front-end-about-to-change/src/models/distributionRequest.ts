export class DistributionRequest {
    public isrc;
    public uploaderId;
    public datetime;

    constructor(
        isrc: string,
        uploaderId: string,
        datetime: string) {
        this.isrc = isrc;
        this.uploaderId = uploaderId;
        this.datetime = datetime;
    }
}