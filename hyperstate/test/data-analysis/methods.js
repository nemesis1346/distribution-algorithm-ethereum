'use strict';
const http = require('http');
const superagent = require('superagent');
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
const OnHoldDistributionRequest = require('../../models/onHoldDistributionRequest.js');

exports.getTxByTrackForDiagram = async function (isrc) {
    try {
        await requestPost('/getTxByTrackForDiagram', JSON.stringify(isrc), 'GetTxByTrackForDiagram');
    } catch (error) {
        console.log('/getTxByTrackForDiagram ERROR');
        console.error(error);
        return new Error(error);
    }
}

exports.getTxByEmiterForBalance = async function (traderId) {
    try {
        await requestPost('/getTxByEmiterForBalance', JSON.stringify(traderId), 'GetTxByEmiterForBalance');
    } catch (error) {
        console.log('/getTxByEmiterForBalance ERROR');
        console.error(error);
        return new Error(error);
    }
}

exports.getTxByReceiverForBalance = async function (traderId) {
    try {
        await requestPost('/getTxByReceiverForBalance', JSON.stringify(traderId), 'GetTxByReceiverForBalance');
    } catch (error) {
        console.log('/getTxByReceiverForBalance ERROR');
        console.error(error);
        return new Error(error);
    }
}

exports.distribution = async function (isrc, uploaderId, date) {
    try {
        let distributionRequest = new DistributionRequest(isrc, uploaderId, date);
        await requestPost('/distributionAlgorithm', JSON.stringify(distributionRequest), 'DISTRIBUTION');
    } catch (error) {
        console.log('/distributionAlgorithm ERROR');
        console.error(error);
        return new Error(error);
    }
}

exports.cascadeDistribution = async function (agreementId, emiterId, receiverId, ammount, isrc) {
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
        console.log('/cascadeDistribution ERROR');
        console.error(error);
        return new Error(error);
    }
}

exports.createUser= async function(name, email, pwd, organizationType, traderId) {
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
        console.log('/createOrganization ERROR');
        console.error(error);
        throw new Error(error);
    }
}

exports.createTrack = async function (trackId, title, revenue, vendorIdentifier, label, author, authorType) {
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
        console.log('/createTrack ERROR');
        console.error(error);
        throw new Error(error);
    }
}


exports.createTrackForArray=async function(trackId, title, revenue, vendorIdentifier, label, author, authorType, uploaderId) {
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
        await requestPost('/createTrackForArray', JSON.stringify(trackModel), 'TRACK');
    } catch (error) {
        console.log('/createTrackForArray ERROR');
        console.error(error);
        throw new Error(error);
    }
}

exports.createAllTracksFromFile= async function(uploaderId) {
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
        console.log('/createAllTracksFromFile ERROR');
        console.error(error);
        throw new Error(error);
    }
}

/**
 * @description This is very customizable, must be improved
 */
exports.uploadPaymentForArray=async function (uploaderId) {
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

exports.createAgreement=async function (agreementId, traderEmiterId, traderReceiverId, percentage, status, isrc, traderEmiterName, traderReceiverName) {
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
        console.log('/createAgreement ERROR');
        console.error(error);
        throw new Error(error);
    }
}

exports.manualPayment=async function (isrc, traderId) {
    var manualPaymentRequest = JSON.stringify({
        "isrc": isrc,
        "traderId": traderId
    });
    try {
        await requestPost('/manualPayment', manualPaymentRequest, 'MANUAL PAYMENT');
    } catch (error) {
        console.log('/manualPayment ERROR');
        console.error(error);
        throw new Error(error);
    }

}

exports.updateTrack=async function (isrc, revenueTotal) {
    var updateRequest = JSON.stringify({
        "isrc": isrc,
        "revenueTotal": revenueTotal
    });
    try {
        await requestPost('/updateTrack', updateRequest, 'UPDATE TRACK');
    } catch (error) {
        console.log('/updateTrack ERROR');
        console.error(error);
        throw new Error(error);
    }

}

/**
 * @description This is a method for make the automatic distribution
 * @param {string} isrc 
 * @param {string} uploader 
 */
exports.paymentDist=async function (isrc, uploader) {
    //DATA FOR TX DISTRIBUTION
    var dataPaymentDistAuto = JSON.stringify({
        "isrc": isrc,
        "uploaderId": uploader
    });
    try {
        await requestPost('/paymentDistributionAutomatic', dataPaymentDistAuto, 'PAYMENT DISTRIBUTION');
    } catch (error) {
        console.log('/paymentDistributionAutomatic ERROR');
        console.error(error);
        throw new Error(error);
    }
}

exports.createParticipant = async function (participantId, name, email, balance, traderType, tokenAccountId) {
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
        console.log('/createParticipant ERROR');
        console.error(error);
        throw new Error(error);
    }
}
exports.onHoldDistribution=async function (isrc, uploaderId) {
    try {

        let onHoldDistributionRequest = new OnHoldDistributionRequest(isrc, uploaderId);
        await requestPost('/onHoldDistribution', JSON.stringify(onHoldDistributionRequest), 'HOLD DISTRIBUTION');

    } catch (error) {
        console.log('/onHoldDistribution ERROR');
        console.error(error);
        throw new Error(error);
    }
}

exports.getTraderDetail = async function (traderId) {
    try {
        let result = await requestPost('/getTraderDetail', JSON.stringify(traderId), 'GET TRADER DETAIL');

        return result;
    } catch (error) {
        console.log('/getTraderDetail ERROR');
        console.error(error);
        throw new Error(error);
    }
}

exports.evaluateEmiters =async function(isrc, uploaderId) {
    try {
        var evaluateEmitersRequest = JSON.stringify({
            "isrc": isrc,
            "uploaderId": uploaderId
        });
        let result = await requestPost('/evaluateEmiters', JSON.stringify(evaluateEmitersRequest), 'EVALUATE RECEIVERS');

        return result;
    } catch (error) {
        console.log('/evaluateEmiters ERROR');
        console.error(error);
        throw new Error(error);
    }
}

exports.getTokenAccount=async function (tokenAccountId) {
    try {
        await requestPost('/getTokenAccountDetail', JSON.stringify(tokenAccountId), 'TOKEN ACCOUNT ID' + tokenAccountId);

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

