'use strict';
const port = 3111;
//Imports
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

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
        console.log(bufferContent);

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
                console.log('On Message');
                console.log(body);
                const responseBody = { headers, method, url, body };
                response.statusCode = 200;
                response.write(JSON.stringify(responseBody));
                response.end();
            })
            .on('error', (error) => {
                console.log('On Error');
                console.log(error);
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
app.post('/getAgreementDetail', handler);
app.post('/createNewTokenAccount', handler);
app.post('/getTrackDetail', handler);
app.post('/getTraderDetail', handler);
app.post('/getTokenAccountDetail', handler);
app.post('/getTransactionsByTrader', handler);
app.post('/updateTrack', handler);
app.post('/getTransactions', handler);
app.post('/distributionAlgorithm', handler);
app.post('/getAgreements', handler);
app.post('/getTxByTrackForDiagram', handler);
app.post('/getTAContractAddress', handler);
app.post('/getTraderContractAddress', handler);
app.post('/getTrackContractAddress', handler);
app.post('/testing_example1', handler);
app.post('/testing_example2', handler);
app.post('/testing_example3', handler);
app.post('/testing_example4', handler);
app.post('/testing_example5', handler);
app.post('/testing_example6', handler);
app.post('/socketError', handler);
app.get('/getTraders', handler);
app.get('/getOrganizations', handler);
app.get('/getTracks', handler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//this is for non existing routes
app.get('*', function (req, res) {
    res.send('what???', 404);
});
app.post('*', function (req, res) {
    res.send('what???', 404);
});


app.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is listening on: ', port);
});
