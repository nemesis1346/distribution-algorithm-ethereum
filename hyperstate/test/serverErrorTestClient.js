'use strict';
const http = require('http');
const superagent = require('superagent');
const UUID = require('uuid/v1');
const TokenAccountModel = require('../models/tokenAccountModel.js');
const UserModel = require('../models/userModel.js');
const TrackModel = require('../models/trackModel.js');
const TraderModel = require('../models/traderModel.js');
const AgreementModel = require('../models/agreementModel.js');
const PORT = '3012';
const HOST = 'localhost';
const Timeout = require('await-timeout');
const AppleTrackData = require('../data/appleData');
const Async = require('async');
const OnHoldDistributionRequest = require('../models/onHoldDistributionRequest.js');
/**
 * Test for requirement:
- 3 parties (A,B,C)
- 2 contracts (AB, BC)
- 1 track input ($10 revenue)
- 3 outputs (Payout to A, to B, and to C)
 */
//Here i m saving all the data
async function mainDataInputProcess() {
    try {

        //INIT DATA////////////////////////////////////////////////////////////// 
        let trackId = UUID();
        await createTrack(trackId, 'track', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');
     

    } catch (error) {
        console.log('THIS IS SOMETHING DIFFERENT');
        console.error(error);
        return new Error(error);
    }
}


/**
 * @description This is a method for creating a generic single track
 * @param {string} trackId 
 * @param {string} title 
 * @param {string} revenue 
 * @param {string} vendorIdentifier 
 * @param {string} label 
 * @param {string} author 
 * @param {string} authorType 
 * @param {string} callback 
 */
async function createTrack(trackId, title, revenue, vendorIdentifier, label, author, authorType) {
    //DATA FOR CREATING TRACK
    var trackModel = new TrackModel(
        trackId,
        title,
        revenue,
        vendorIdentifier,
        label,
        author,
        authorType
    );
    try {
        await requestPost('/createTrack', JSON.stringify(trackModel), 'TRACK');
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}


/**
 * This is a generic method for post request
 * @param {Its the name of the endpoint or method at the end} endpoint 
 * @param {Its the data, usually should be a json object} data 
 */
async function requestPost(endpoint, data, extraInfo) {
    let result;
    try {
        const res = await superagent
            .post(`${HOST}:${PORT}${endpoint}`)
            .set('Content-Type', 'application/json')
            .set('Content-Length', Buffer.byteLength(data))
            .send(data);

        result = JSON.parse(res.res.text)
        console.log('RESPONSE IN: ' + extraInfo);
        console.log(result);
        return result;
    } catch (error) {
        console.log('THERE WAS AN ERROR IN: ' + extraInfo);
        if (error.response) {
            result = JSON.parse(error.response.res.text);
            console.error(result);
        } else {
            console.log(error);
        }
    }
    // return result;
}
/**
 * This is a generic method for get request
 * @param {Its the name of the endpoint or method at the end} endpoint 
 */
async function requestGet(endpoint, extraInfo) {
    let get_options = {
        host: HOST,
        port: PORT,
        path: endpoint,
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    let get_req = http.request(get_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('RESPONSE in ' + endpoint + '------------' + extraInfo);
            let response = JSON.parse(chunk);
            let body = JSON.parse(response.body);
            console.log(body);
        });
    });
    await get_req.end()
}

mainDataInputProcess();


