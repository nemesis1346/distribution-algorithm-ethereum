const DataModel = require("../../models/dataModel.js");
const IsolatedChaincode = require("./isolatedChaincode.js");

process.on('message', function (input) {
    console.log(input)
    const data = process.argv.slice(2);
    let promise = data[0];
    console.log(promise);
    process.send('Hola');
    //Call method
    // let promise;
    // let dataModel = new DataModel(null, null, null);

    //   try {
    //     switch (url) {
    //       case "/createTrack":
    //         promise = this.isolatedChaincode.createTrack(
    //           JSON.parse(bufferContent)
    //         );
    //         break;
    //       default:
    //         dataModel.message = "Method not found";
    //         dataModel.status = "405";
    //         let body = JSON.stringify(dataModel);

    //         console.log("STATUS 405: ");
    //         console.log("Method not found");
    //         const responseBody = { headers, method, url, body };

    //         response.statusCode = 405;
    //         response.write(JSON.stringify(responseBody));
    //         response.end();
    //         break;
    //     }

    //     //Executing the promise , maybe need POST and GET
    //     if (promise != null) {
    //         promise
    //           .then(function(result) {
    //             console.log(result);
    //             //This is status 200 , everything ok
    //             if (result) {
    //               if (result.status == "200") {
    //                 dataModel.data = result;
    //                 dataModel.status = "200";
    //               } else {
    //                 console.log(dataModel);
    //                 dataModel.message = result;
    //                 dataModel.status = "300";
    //               }
    //             } else {
    //               console.log("Something went wrong");
    //               console.log(result);
    //             }
    //             let body = JSON.stringify(dataModel);
    //             console.log("STATUS 200: ");
    //             console.log(body);
    //             const responseBody = { headers, method, url, body };

    //             response.statusCode = 200;
    //             response.write(JSON.stringify(responseBody));
    //             response.end();
    //           })
    //           .catch(error => {
    //             console.log("ERROR IN GATE");

    //             dataModel.message = error.message.toString();
    //             dataModel.status = "400";
    //             let body = JSON.stringify(dataModel);
    //             console.log("ERROR 400:");
    //             console.log(dataModel);
    //             const responseBody = { headers, method, url, body };

    //             response.statusCode = 300;
    //             response.write(JSON.stringify(responseBody));
    //             response.end();
    //           });
    //     }
    //   } catch (error) {
    //     dataModel.message = error.message.toString();
    //     dataModel.status = "500";
    //     let body = JSON.stringify(dataModel);
    //     console.log("ERROR 500:");
    //     console.log(error);
    //     const responseBody = { headers, method, url, body };

    //     response.statusCode = 500;
    //     response.write(JSON.stringify(responseBody));
    //     response.end();
    //   }
});