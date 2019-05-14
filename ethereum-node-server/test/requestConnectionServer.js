'use strict';
const http = require('http');
const superagent = require('superagent');
const TokenAccountModel = require('../models/tokenAccountModel.js');
const DistributionRequest = require('../models/distributionRequest.js');
const TraderModel = require('../models/traderModel.js');
const AgreementModel = require('../models/agreementModel.js');
const CreateTrackRequest = require('../models/createTrackRequest.js');
const CreateAgreementRequest =require('../models/createAgreementRequest.js');
const CreateTraderRequest = require('../models/createTraderRequest.js');
const GetTraderRequest = require('../models/getTraderRequest.js');
const GetTARequest =require('../models/getTARequest.js');

var PORT = '3111';
//const PORT = '3019';
var HOST = 'localhost';
//const HOST = '104.196.55.102';

exports.getPort = () => {
    return PORT;
}
exports.setPort = (port) => {
    PORT = port;
}

exports.distribution = async function (trackId, uploaderId, date,fromAddress,gasLimit) {
    try {
        let distributionRequest = new DistributionRequest(
            trackId, 
            uploaderId, 
            date,
            fromAddress,
            gasLimit);
        await requestPost('/distributionAlgorithm', JSON.stringify(distributionRequest), 'DISTRIBUTION');
    } catch (error) {
        console.log('/distributionAlgorithm ERROR');
        return new Error(error);
    }
}
exports.createTrack = async function (trackId, isrc,title, revenue, fromAddress,gasLimit) {
    //DATA FOR CREATING TRACK
    let createTrackRequest = new CreateTrackRequest(
        trackId,
        isrc,
        title,
        revenue,
        fromAddress,
        gasLimit
    );
    try {
        await requestPost('/createTrack', JSON.stringify(createTrackRequest), 'TRACK');
    } catch (error) {
        console.log('/createTrack ERROR');
        console.error(error);
        throw new Error(error);
    }
}
exports.createAgreement = async function (agreementId, traderEmiterId, traderReceiverId, percentage, trackId,tradersCtrAddr,tracksCtrAddr,fromAddress,gasLimit) {
    //DATA FOR TX CREATE GENERIC AGREEMENT
    //TODO: change the request
    let createAgreementRequest = new CreateAgreementRequest(
        agreementId,
        traderEmiterId,
        traderReceiverId,
        percentage,
        trackId,
        tradersCtrAddr,
        tracksCtrAddr,
        fromAddress,
        gasLimit
    );

    try {
        await requestPost('/createAgreement', JSON.stringify(createAgreementRequest), 'CREATE AGREEMENT');
    } catch (error) {
        console.log('/createAgreement ERROR');
        throw new Error(error);
    }
}

exports.getTraderContractAddress = async function () {
    try {
       let result = await requestPost('/getTraderContractAddress',"",'GET TRADER CONTRACT ADDRESS');
       return result;
    } catch (error) {
        console.log('/getTraderContractAddress ERROR');
        throw new Error(error);
    }
}

exports.getTrackContractAddress = async function () {
    try {
        let result = await requestPost('/getTrackContractAddress',"",'GET TRACK CONTRACT ADDRESS');
        return result;
    } catch (error) {
        console.log('/getTrackContractAddress ERROR');
        throw new Error(error);
    }
}

exports.getTAContractAddress=async function(){
    try {
        let result = await requestPost('/getTAContractAddress',"getTAContractAddress",'GET TOKEN ACCOUNT CONTRACT ADDRESS');
        return result;
    } catch (error) {
        console.log('/getTAContractAddress ERROR');
        throw new Error(error);
    }
}

exports.updateTrack = async function (isrc, revenueTotal) {
    var updateRequest = JSON.stringify({
        "isrc": isrc,
        "revenueTotal": revenueTotal
    });
    try {
        await requestPost('/updateTrack', updateRequest, 'UPDATE TRACK');
    } catch (error) {
        console.log('/updateTrack ERROR');
        throw new Error(error);
    }
}
exports.createTrader = async function (traderId, name, tokenAccountId,TAContractAddress, fromAddress, gasLimit) {
    //DATA FOR CREATE A GENERIC PARTICIPANT
    let createTraderRequest = new CreateTraderRequest(
        traderId,
        name,
        tokenAccountId,
        TAContractAddress,
        fromAddress,
        gasLimit
    );
    try {
        await requestPost('/createTrader', JSON.stringify(createTraderRequest), 'TRADER ' + name);
    } catch (error) {
        console.log('/createTrader ERROR');
        throw new Error(error);
    }
}


exports.getTraderDetail = async function (traderId,fromAddress, gasLimit) {
    let getTraderRequest = new GetTraderRequest(
        traderId,
        fromAddress,
        gasLimit
    );
    try {
        let result = await requestPost('/getTraderDetail', JSON.stringify(getTraderRequest), 'GET TRADER DETAIL');
        return result;
    } catch (error) {
        console.log('/getTraderDetail ERROR');
        throw new Error(error);
    }
}

exports.getTokenAccount = async function (tokenAccountId,fromAddress,gasLimit) {
    let getTARequest = new GetTARequest(
        tokenAccountId,
        fromAddress,
        gasLimit
    );
    try {
       let result= await requestPost('/getTokenAccountDetail', JSON.stringify(getTARequest), 'TOKEN ACCOUNT ID' + tokenAccountId);
        return result;
    } catch (error) {
        console.log('/getTokenAccountDetail ERROR');
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
        //console.log(result);
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

