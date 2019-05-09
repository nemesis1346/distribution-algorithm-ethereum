class DistributionlastNodeRequest {
    constructor(
        listEmiters,
        traderReceiverId,
        percentageReceiver,
        ammount,
        isrc,
        datetime,
        uploaderId
    ) {
        this.listEmiters = listEmiters;
        this.traderReceiverId = traderReceiverId;
        this.percentageReceiver = percentageReceiver;
        this.ammount = ammount;
        this.isrc=isrc;
        this.datetime=datetime;
        this.uploaderId=uploaderId;
    }
}

module.exports = DistributionlastNodeRequest;
