'use strict';
const port = 3012
//Imports
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const IsolatedChaincode = require('./isolatedChaincode.js');
const DataModel = require('../../models/dataModel.js');
const cp  = require('child_process');

const app = express();

const handler = async (request, response) => {
    const { headers, method, url } = request;
    let buffer = [];
    request.on('error', (err) => {
        console.log("Error", err);
    }).on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', async () => {
        let bufferContent = Buffer.concat(buffer).toString();

        //Set response
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        response.on('error', (err) => {
            console.error(err);
        });
        //Call method
        let promise;
        let dataModel = new DataModel(null, null, null);

        try {
            switch (url) {
                case '/createTrack':
                    promise = this.isolatedChaincode.createTrack(JSON.parse(bufferContent));
                    break;
                default:
                    dataModel.message = 'Method not found';
                    dataModel.status = '405';
                    let body = JSON.stringify(dataModel);

                    console.log('STATUS 405: ');
                    console.log('Method not found');
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 405;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                    break;
            }

            //Executing the promise , maybe need POST and GET
            if (promise != null) {
                promise.then(function (result) {
                    console.log(result);
                    //This is status 200 , everything ok
                    if (result) {
                        if (result.status == '200') {
                            dataModel.data = result;
                            dataModel.status = '200';
                        } else {
                            console.log(dataModel)
                            dataModel.message = result;
                            dataModel.status = '300';
                        }
                    } else {
                        console.log('Something went wrong');
                        console.log(result);
                    }
                    let body = JSON.stringify(dataModel);
                    console.log('STATUS 200: ');
                    console.log(body);
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 200;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                }).catch((error) => {
                    console.log('ERROR IN GATE');

                    dataModel.message = error.message.toString();
                    dataModel.status = '400';
                    let body = JSON.stringify(dataModel);
                    console.log('ERROR 400:');
                    console.log(dataModel);
                    const responseBody = { headers, method, url, body };

                    response.statusCode = 300;
                    response.write(JSON.stringify(responseBody));
                    response.end();
                });
            }
        } catch (error) {
            dataModel.message = error.message.toString();
            dataModel.status = '500';
            let body = JSON.stringify(dataModel);
            console.log('ERROR 500:');
            console.log(error);
            const responseBody = { headers, method, url, body };

            response.statusCode = 500;
            response.write(JSON.stringify(responseBody));
            response.end();
        }
    });
}

app.post('/createTrack', handler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    try {
        this.isolatedChaincode = new IsolatedChaincode();

    } catch (error) {
        console.log("Error Composer instance: ", error);
    }
    console.log('server is listening on: ', port);
});
