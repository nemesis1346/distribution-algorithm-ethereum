'use strict';

const DiagramTreeLevelModel = require('../../models/diagramTreeLevelModel.js');

function process() {
    let response = { "status": "200", "data": { "status": "200", "data": "{\"receiptList\":\"[{\\\"paymentReceiptId\\\":\\\"d8714080-0082-11e9-9adf-c9f09fd34582\\\",\\\"isrc\\\":\\\"ab272a90-0082-11e9-a907-61b297a290d4\\\",\\\"ammount\\\":5,\\\"traderEmiterId\\\":\\\"none\\\",\\\"traderReceiverId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptType\\\":\\\"DISTRIBUTION\\\",\\\"agreementId\\\":\\\"none\\\",\\\"paymentReceiptStatus\\\":\\\"EARNED\\\",\\\"traderEmiterName\\\":\\\"none\\\",\\\"traderReceiverName\\\":\\\"Membran\\\",\\\"datetime\\\":\\\"2018-12-15T16:02:36.266Z\\\",\\\"uploaderId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\"},{\\\"paymentReceiptId\\\":\\\"db3d0ab0-0082-11e9-9adf-c9f09fd34582\\\",\\\"isrc\\\":\\\"ab272a90-0082-11e9-a907-61b297a290d4\\\",\\\"ammount\\\":1.25,\\\"traderEmiterId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\",\\\"traderReceiverId\\\":\\\"be20f450-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptType\\\":\\\"DISTRIBUTION\\\",\\\"agreementId\\\":\\\"ce6206b0-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptStatus\\\":\\\"EARNED\\\",\\\"traderEmiterName\\\":\\\"Membran\\\",\\\"traderReceiverName\\\":\\\"Artist1\\\",\\\"datetime\\\":\\\"2018-12-15T16:02:36.266Z\\\",\\\"uploaderId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\"},{\\\"paymentReceiptId\\\":\\\"de401180-0082-11e9-9adf-c9f09fd34582\\\",\\\"isrc\\\":\\\"ab272a90-0082-11e9-a907-61b297a290d4\\\",\\\"ammount\\\":0.625,\\\"traderEmiterId\\\":\\\"be20f450-0082-11e9-a907-61b297a290d4\\\",\\\"traderReceiverId\\\":\\\"b6079710-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptType\\\":\\\"DISTRIBUTION\\\",\\\"agreementId\\\":\\\"d13af040-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptStatus\\\":\\\"EARNED\\\",\\\"traderEmiterName\\\":\\\"Artist1\\\",\\\"traderReceiverName\\\":\\\"The Orchard\\\",\\\"datetime\\\":\\\"2018-12-15T16:02:36.266Z\\\",\\\"uploaderId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\"},{\\\"paymentReceiptId\\\":\\\"e170b800-0082-11e9-9adf-c9f09fd34582\\\",\\\"isrc\\\":\\\"ab272a90-0082-11e9-a907-61b297a290d4\\\",\\\"ammount\\\":0.625,\\\"traderEmiterId\\\":\\\"b6079710-0082-11e9-a907-61b297a290d4\\\",\\\"traderReceiverId\\\":\\\"ca50c430-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptType\\\":\\\"DISTRIBUTION\\\",\\\"agreementId\\\":\\\"d41d0190-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptStatus\\\":\\\"EARNED\\\",\\\"traderEmiterName\\\":\\\"The Orchard\\\",\\\"traderReceiverName\\\":\\\"Artist4\\\",\\\"datetime\\\":\\\"2018-12-15T16:02:36.266Z\\\",\\\"uploaderId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\"},{\\\"paymentReceiptId\\\":\\\"e4466d40-0082-11e9-9adf-c9f09fd34582\\\",\\\"isrc\\\":\\\"ab272a90-0082-11e9-a907-61b297a290d4\\\",\\\"ammount\\\":1.25,\\\"traderEmiterId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\",\\\"traderReceiverId\\\":\\\"c2284bc0-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptType\\\":\\\"DISTRIBUTION\\\",\\\"agreementId\\\":\\\"cfcfc780-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptStatus\\\":\\\"EARNED\\\",\\\"traderEmiterName\\\":\\\"Membran\\\",\\\"traderReceiverName\\\":\\\"Artist2\\\",\\\"datetime\\\":\\\"2018-12-15T16:02:36.266Z\\\",\\\"uploaderId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\"},{\\\"paymentReceiptId\\\":\\\"e7708410-0082-11e9-9adf-c9f09fd34582\\\",\\\"isrc\\\":\\\"ab272a90-0082-11e9-a907-61b297a290d4\\\",\\\"ammount\\\":1.25,\\\"traderEmiterId\\\":\\\"c2284bc0-0082-11e9-a907-61b297a290d4\\\",\\\"traderReceiverId\\\":\\\"c63bd830-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptType\\\":\\\"DISTRIBUTION\\\",\\\"agreementId\\\":\\\"d2b0c760-0082-11e9-a907-61b297a290d4\\\",\\\"paymentReceiptStatus\\\":\\\"EARNED\\\",\\\"traderEmiterName\\\":\\\"Artist2\\\",\\\"traderReceiverName\\\":\\\"Artist3\\\",\\\"datetime\\\":\\\"2018-12-15T16:02:36.266Z\\\",\\\"uploaderId\\\":\\\"ba14e1f0-0082-11e9-a907-61b297a290d4\\\"}]\",\"uploaderId\":\"ba14e1f0-0082-11e9-a907-61b297a290d4\",\"trackRevenue\":10}", "message": null }, "message": null }

    if (response.data) {
        let data = JSON.parse(response.data.data);
        let receiptList = JSON.parse(data.receiptList);

        let firstEmiterId = receiptList[0].uploaderId;
        let finalResult;

        receiptList.forEach(element => {
            if (element.traderReceiverId == data.uploaderId) {
                //We extract the Id of the first trader
                finalResult = element;
            }
        });

        let subResult = getNestedChildren(receiptList, firstEmiterId);
        finalResult.children = subResult;
        console.log(JSON.stringify(finalResult));

    } else {
        console.log('error');
    }
}

process();

function getNestedChildren(arr, traderEmiterId) {
    var out = []
    for (var i in arr) {
        if (arr[i].traderEmiterId == traderEmiterId) {
            var children = getNestedChildren(arr, arr[i].traderReceiverId)

            if (children.length) {
                arr[i].children = children
            }
            out.push(arr[i])
        }
    }
    return out
}           