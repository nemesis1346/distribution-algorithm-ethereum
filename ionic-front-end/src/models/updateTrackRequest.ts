export class UpdateTrackRequest {
    public isrc;
    public revenueTotal;

    constructor(
        isrc: string,
        revenueTotal: string) {
        this.isrc = isrc;
        this.revenueTotal = revenueTotal;
    }
}