"use strict";
const port = 3019;
//Imports
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const cp = require("child_process");
const { fork } = require('promisify-child-process')

const app = express();

const handler = async (request, response) => {
    const { headers, method, url } = request;
    let buffer = [];
    request
        .on("error", err => {
            console.log("Error", err);
        })
        .on("data", chunk => {
            buffer.push(chunk);
        })
        .on("end", async () => {
            let bufferContent = Buffer.concat(buffer).toString();
            console.log(bufferContent);
            //Set response
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader(
                "Access-Control-Allow-Methods",
                "GET,PUT,POST,DELETE,OPTIONS"
            );
            response.setHeader(
                "Access-Control-Allow-Headers",
                "Content-Type, Authorization, Content-Length, X-Requested-With"
            );
            response.on("error", err => {
                console.error(err);
            });
            await fork('./promiseProcessHandler.js', ['message'], { encoding: 'utf8' })
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
};

app.post("/createTrack", handler);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, async err => {
    if (err) {
        return console.log("something bad happened", err);
    }
    console.log("server is listening on: ", port);
});
