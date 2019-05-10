'use strict';
const port = 3111;
//This is very necessary to the data analysis. Must be replicated in both platforms
//Imports
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

//const { exec, spawn, fork, execFile } = require('promisify-child-process')
const { fork } = require('child_process');

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
        //console.log(bufferContent);

        //Set response
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        response.on('error', (err) => {
            console.error(err);
        });
        await fork('./handlerProcess.js', ['message'], { encoding: 'utf8' })
        .on("message", (body) => {
            const responseBody = { headers, method, url, body };
            response.statusCode = 200;
            response.write(JSON.stringify(responseBody));
            response.end();
        })
        .on('error', (error) => {
            const responseBody = { headers, method, url, error };
            response.statusCode = 300;
            response.write(JSON.stringify(responseBody));
            response.end();
        })
        .send({ data: JSON.stringify(bufferContent), url: url });
    });
}

app.post('/createTrader', handler);
app.post('/createTrack', handler);
app.post('/createAgreement', handler);
app.post('/getAgreementsByTrack', handler);
//app.post('/getAgreementDetail', handler); //it is not posible to query concepts
app.get('/getTraders', handler);
app.get('/getOrganizations', handler);
app.get('/getTracks', handler);
app.post('/createNewTokenAccount', handler);
app.post('/getTrackDetail', handler);
app.post('/getTraderDetail', handler);
app.post('/getTokenAccountDetail', handler);
app.post('/paymentDistributionAutomatic', handler);
app.post('/removeAgreement', handler);
app.post('/withdraw', handler);
app.post('/getTransactionsByTrader', handler);
app.post('/updateTrack', handler);
app.post('/manualPayment', handler);
app.post('/getTransactions', handler);
app.post('/getTxByStatusTypeTrader', handler);
app.post('/onHoldDistribution', handler);
app.post('/cascadeDistribution', handler);
app.post('/evaluateEmiters', handler);
app.post('/getTxByReceiverForBalance', handler);
app.post('/withdrawalByTrader', handler);
app.post('/getTxByEmiterForBalance', handler);
app.post('/distributionAlgorithm', handler);
app.post('/getAgreements', handler);
app.post('/getTxByTrackForDiagram', handler);
app.post('/testing_example1', handler);
app.post('/testing_example2', handler);
app.post('/testing_example3', handler);
app.post('/testing_example4', handler);
app.post('/testing_example5', handler);
app.post('/testing_example6', handler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('server is listening on: ', port);
});
