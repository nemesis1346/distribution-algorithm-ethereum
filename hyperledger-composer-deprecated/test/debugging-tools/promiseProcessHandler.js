const DataModel = require("../../models/dataModel.js");
const IsolatedChaincode = require("./isolatedChaincode.js");

process.on('message', async function (input) {
    let result;
    let dataModel = new DataModel(null, null, null);
    let isolatedChaincode = new IsolatedChaincode();
    try {
        let bufferContent = JSON.parse(input.data);
        let url = input.url;
        switch (url) {
            case "/createTrack":
                result = await isolatedChaincode.createTrack(
                    JSON.parse(bufferContent)
                );
                break;
            default:
                dataModel.message = "Method not found";
                dataModel.status = "405";
                let body = JSON.stringify(dataModel);
                console.log("STATUS 405: ");
                console.log("Method not found");
                process.send(body);    
                break;
        }

        //Executing the promise , maybe need POST and GET
        if (result != null) {
            console.log(result);
            //This is status 200 , everything ok
            if (result) {
                if (result.status == "200") {
                    dataModel.data = result;
                    dataModel.status = "200";
                } else {
                    console.log(dataModel);
                    dataModel.message = result;
                    dataModel.status = "300";
                }
            } else {
                console.log("Something went wrong");
                console.log(result);
            }
            let body = JSON.stringify(dataModel);
            console.log("STATUS 200: ");
            console.log(body);
            process.send(body);
        }
    } catch (error) {
        console.log("ERROR IN GATE");
        dataModel.message = error.message.toString();
        dataModel.status = "400";
        let body = JSON.stringify(dataModel);
        console.log("ERROR 400:");
        console.log(dataModel);
        process.send(body);
    }
});