class OnHoldDistributionRequest {

    constructor(
        isrc,
        uploaderId,
        datetime,
        ammount) {
        this.isrc = isrc;
        this.uploaderId = uploaderId;
        this.datetime=  datetime;
        this.ammount=ammount;
    }
}
module.exports = OnHoldDistributionRequest;