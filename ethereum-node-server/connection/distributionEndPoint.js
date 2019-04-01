
function distribution(trackId, uploaderId, datetime) {

}
function evaluateReceivers(tracKId, emitterId, revenueTotalInput, datetime, previousReceiverId, previousAgreement, uploaderId) {
    let previousReceiver;
    let emiter = await tradersInterface.getTrader(emiterId);
    if (previousReceiverId && previousReceiverId != "none") {
        previousReceiver = await tradersInterface.getTrader(previousReceiverId);
       // previousReceiverId = previousReceiver.traderId;
    } else {
        previousReceiverId = 'none';
    }
}