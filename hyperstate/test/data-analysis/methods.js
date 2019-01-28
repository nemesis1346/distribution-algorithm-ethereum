'use strict';
const http = require('http');
const superagent = require('superagent');
const UUID = require('uuid/v1');
const TokenAccountModel = require('../../models/tokenAccountModel.js');
const UserModel = require('../../models/userModel.js');
const DistributionRequest = require('../../models/distributionRequest.js');
const TrackModel = require('../../models/trackModel.js');
const TraderModel = require('../../models/traderModel.js');
const AgreementModel = require('../../models/agreementModel.js');
const PORT = '3011';
const HOST = 'localhost';
const Timeout = require('await-timeout');
const AppleTrackData = require('../../data/processedData/Apple_Streams_S1_80032046_1117_AU_for_201710_exampleJSON');
const Async = require('async');
const OnHoldDistributionRequest = require('../../models/onHoldDistributionRequest.js');

async function getTxByTrackForDiagram(isrc){
    try {
        await requestPost('/getTxByTrackForDiagram', JSON.stringify(isrc), 'GetTxByTrackForDiagram');
    } catch (error) {
        console.log('THIS IS SOMETHING DIFFERENT');
        console.error(error);
        return new Error(error);
    }
}

async function getTxByEmiterForBalance(traderId) {
    try {

        await requestPost('/getTxByEmiterForBalance', JSON.stringify(traderId), 'GetTxByEmiterForBalance');

    } catch (error) {
        console.log('THIS IS SOMETHING DIFFERENT');
        console.error(error);
        return new Error(error);
    }
}

async function getTxByReceiverForBalance(traderId) {
    try {

        await requestPost('/getTxByReceiverForBalance', JSON.stringify(traderId), 'GetTxByReceiverForBalance');

    } catch (error) {
        console.log('THIS IS SOMETHING DIFFERENT');
        console.error(error);
        return new Error(error);
    }
}


async function distribution(isrc, uploaderId, date) {
    try {
        let distributionRequest = new DistributionRequest(isrc, uploaderId, date);

        await requestPost('/distributionAlgorithm', JSON.stringify(distributionRequest), 'DISTRIBUTION');

    } catch (error) {
        console.log('THIS IS SOMETHING DIFFERENT');
        console.error(error);
        return new Error(error);
    }
}

async function cascadeDistribution(agreementId, emiterId, receiverId, ammount, isrc) {
    try {
        var cascadeDistributionRequest = JSON.stringify({
            "traderReceiverId": receiverId,
            "ammount": ammount,
            "isrc": isrc,
            "emiterId": emiterId,
            "agreementId": agreementId
        });
        await requestPost('/cascadeDistribution', JSON.stringify(cascadeDistributionRequest), 'CASCADE DISTRIBUTION');

    } catch (error) {
        console.log('THIS IS SOMETHING DIFFERENT');
        console.error(error);
        return new Error(error);
    }
}
/**
 * @description This is a generic method for creating a generic user
 * @param {string} name 
 * @param {string} email 
 * @param {string} pwd 
 * @param {string} organizationType 
 * @param {string} traderId 
 */
async function createUser(name, email, pwd, organizationType, traderId) {
    //DATA FOR CREATING AN ADMIN UER
    var adminModel = new UserModel(
        name,
        email,
        pwd,
        organizationType,
        traderId
    );
    // we set a delay just in case composer has MVVC problem
    try {
        await requestPost('/createOrganization', JSON.stringify(adminModel), 'ADMIN');
    } catch (error) {
        console.error(error);
        throw new Error(error);
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
 * @description This method is to load the single track but with custom post 
 * @param {string} trackId 
 * @param {string} title 
 * @param {string} revenue 
 * @param {string} vendorIdentifier 
 * @param {string} label 
 * @param {string} author 
 * @param {string} authorType 
 * @param {string} callback 
 */
async function createTrackForArray(trackId, title, revenue, vendorIdentifier, label, author, authorType, uploaderId) {
    //DATA FOR CREATING TRACK
    var trackModel = new TrackModel(
        trackId,
        title,
        revenue,
        vendorIdentifier,
        label,
        author,
        authorType,
        uploaderId
    );
    try {
        await requestPost('/createTrack', JSON.stringify(trackModel), 'TRACK');
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

/**
 * @description This method is to load the data of the songs we have with Membran
 * @param {uploaderId} uploaderId 
 */
async function createAllTracksFromFile(uploaderId) {
    try {
        let listTracks = [];
        AppleTrackData.forEach((element) => {
            //We save the artists first
            var currentTrack = new TrackModel(
                element.isrc,
                element.title,
                parseFloat(element.revenueTotal),
                element.vendorIdentifier,
                'Apple',
                element.author,
                'MUSICIAN',
                uploaderId
            );
            listTracks.push(currentTrack);
        });
        let newlistTracks = listTracks.slice(0, 40);
        console.log(newlistTracks);

        newlistTracks.forEach(async element => {
            await createTrackForArray(
                element.isrc,
                element.title,
                element.revenueTotal,
                "vendorIdentifier",
                element.label,
                element.author,
                element.ownerType,
                uploaderId
            );
        });
        // for (const element of newlistTracks) {
        //     await createTrackForArray(
        //         element.isrc,
        //         element.title,
        //         element.revenueTotal,
        //         "vendorIdentifier",
        //         element.label,
        //         element.author,
        //         element.ownerType,
        //         uploaderId
        //     );
        // }

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

/**
 * @description This is very customizable, must be improved
 */
async function uploadPaymentForArray(uploaderId) {
    let listTracks = [];

    //We make the transaction related with the upload   
    AppleTrackData.forEach((element) => {
        //We save the artists first
        var currentTrack = new TrackModel(
            element.isrc,
            element.title,
            parseFloat(element.revenueTotal),
            element.vendorIdentifier,
            'Apple',
            element.author,
            'MUSICIAN',
            uploaderId,
        );
        listTracks.push(currentTrack);
    });
    let newlistTracks = listTracks.slice(0, 1)

    for (const element of newlistTracks) {
        paymentDist(element.isrc, uploaderId);
    }
}

/**
 * @description This method is for creating a generic method for creating agreements
 * @param {string} agreementId 
 * @param {string} traderEmiterId 
 * @param {string} traderReceiverId 
 * @param {string} percentage 
 * @param {string} status 
 * @param {string} isrc 
 * @param {string} traderEmiterName 
 * @param {string} traderReceiverName 
 */
async function createAgreement(agreementId, traderEmiterId, traderReceiverId, percentage, status, isrc, traderEmiterName, traderReceiverName) {
    //DATA FOR TX CREATE GENERIC AGREEMENT
    var agreementModel = new AgreementModel(
        agreementId,
        traderEmiterId,
        traderReceiverId,
        percentage,
        status,
        isrc,
        traderEmiterName,
        traderReceiverName
    );

    try {
        await requestPost('/createAgreement', JSON.stringify(agreementModel), 'CREATE AGREEMENT');
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

async function manualPayment(isrc, traderId) {
    var manualPaymentRequest = JSON.stringify({
        "isrc": isrc,
        "traderId": traderId
    });
    try {
        await requestPost('/manualPayment', manualPaymentRequest, 'MANUAL PAYMENT');
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

}

async function updateTrack(isrc, revenueTotal) {
    var updateRequest = JSON.stringify({
        "isrc": isrc,
        "revenueTotal": revenueTotal
    });
    try {
        await requestPost('/updateTrack', updateRequest, 'UPDATE TRACK');
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

}

/**
 * @description This is a method for make the automatic distribution
 * @param {string} isrc 
 * @param {string} uploader 
 */
async function paymentDist(isrc, uploader) {
    //DATA FOR TX DISTRIBUTION
    var dataPaymentDistAuto = JSON.stringify({
        "isrc": isrc,
        "uploaderId": uploader
    });
    try {
        await requestPost('/paymentDistributionAutomatic', dataPaymentDistAuto, 'PAYMENT DISTRIBUTION');
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
/**
 * @description This is a generic method for creating participant in testing mode
 * @param {string} participantId 
 * @param {string} name 
 * @param {string} email 
 * @param {string} balance 
 * @param {string} traderType 
 * @param {string} tokenAccountId 
 */
async function createParticipant(participantId, name, email, balance, traderType, tokenAccountId) {
    //DATA FOR CREATE A GENERIC PARTICIPANT
    let participantModel = new TraderModel(
        participantId,
        name,
        email,
        balance,
        traderType,
        tokenAccountId,
    );

    try {
        await requestPost('/createTrader', JSON.stringify(participantModel), 'PARTICIPANT ' + name);
        await requestPost('/createNewTokenAccount', JSON.stringify(tokenAccountId), 'TOKEN ACCOUNT ' + name);
    } catch (error) {
        console.log('THIS IS SOMETHING NEW');
        console.error(error);
        throw new Error(error);
    }
}
async function onHoldDistribution(isrc, uploaderId) {
    try {

        let onHoldDistributionRequest = new OnHoldDistributionRequest(isrc, uploaderId);
        await requestPost('/onHoldDistribution', JSON.stringify(onHoldDistributionRequest), 'HOLD DISTRIBUTION');

    } catch (error) {
        console.log('THIS IS SOMETHING NEW');
        console.error(error);
        throw new Error(error);
    }
}

async function getTraderDetail(traderId) {
    try {
        let result = await requestPost('/getTraderDetail', JSON.stringify(traderId), 'GET TRADER DETAIL');

        return result;
    } catch (error) {
        console.log('THIS IS SOMETHING NEW');
        console.error(error);
        throw new Error(error);
    }
}

async function evaluateEmiters(isrc, uploaderId) {
    try {
        var evaluateEmitersRequest = JSON.stringify({
            "isrc": isrc,
            "uploaderId": uploaderId
        });
        let result = await requestPost('/evaluateEmiters', JSON.stringify(evaluateEmitersRequest), 'EVALUATE RECEIVERS');

        return result;
    } catch (error) {
        console.log('THIS IS SOMETHING NEW');
        console.error(error);
        throw new Error(error);
    }
}

async function getTokenAccount(tokenAccountId) {
    try {
        await requestPost('/getTokenAccountDetail', JSON.stringify(tokenAccountId), 'TOKEN ACCOUNT ID' + tokenAccountId);

    } catch (error) {
        console.log('THIS IS SOMETHING NEW');
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


