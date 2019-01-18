'use strict';
const http = require('http');
const UUID = require('uuid/v1');
const TokenAccountModel = require('../models/tokenAccountModel.js');

/**
 * Test for requirement:
- 3 parties (A,B,C)
- 2 contracts (AB, BC)
- 1 track input ($10 revenue)
- 3 outputs (Payout to A, to B, and to C)
 */

function createTrackRequest() {
    //DATA FOR CREATING AN ADMIN UER
    var dataAdmin = JSON.stringify({
        "email": "admin",
        "pwd": "admin",
        "name": "title",
        "organizationType": "ADMIN"
    });

    // An object of options to indicate where to post to
    var post_createOrganizationAdmin_options = buildPost('/createOrganization', dataAdmin);

    var post_req_createOrganizationAdmin = http.request(post_createOrganizationAdmin_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            let responseOrganizationAdmin = JSON.parse(chunk);
            let bodyOrganizationAdmin = JSON.parse(responseOrganizationAdmin.body);

            console.log('Response of trader The Orchard: ');
            console.log(bodyOrganizationAdmin);

            let trackId = '0123456789';

            //DATA FOR CREATING TRACK
            var dataTrack = JSON.stringify({
                "isrc": trackId,
                "title": "title",
                "revenueTotal": 10.00,
                "vendorIdentifier": "vendorIdentifier",
                "label": "label",
                "author": "author",
                "ownerType": "MUSICIAN"
            });

            // An object of options to indicate where to post to
            var post_createTrack_options = buildPost('/createTrack', dataTrack);
            // Set up the request for CREATE TRACK
            var post_req_createTrack = http.request(post_createTrack_options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    let responseTrack = JSON.parse(chunk);
                    let bodyTrack = JSON.parse(responseTrack.body);

                    console.log('Response of track: ');
                    console.log(bodyTrack);
                    //DATA FOR CREATE TRADER THE ORCHARD
                    let orchardId = UUID();

                    // Build the post of trader THE ORCHARD
                    var dataOrchard = JSON.stringify({
                        'traderId': orchardId,
                        'name': 'TheOrchard',
                        'email': 'orchard@gmail.com',
                        'balance': 0.00,
                        'traderType': 'DISTRIBUTOR',
                        'tokenAccountId': orchardId,
                        'traderHierarchy':2
                    });
                    // An object of options to indicate the post for create
                    var post_createTraderOrchard_options = buildPost('/createTrader', dataOrchard);
                    var post_req_createTraderOrchard = http.request(post_createTraderOrchard_options, function (res) {
                        res.setEncoding('utf8');
                        res.on('data', function (chunk) {
                            let responseTraderOrchard = JSON.parse(chunk);
                            let bodyTraderOrchard = JSON.parse(responseTraderOrchard.body);

                            console.log('Response of trader The Orchard: ');
                            console.log(bodyTraderOrchard);

                            //DATA FOR CREATE ORCHARD TOKEN
                            let tokenAccountOrchard = new TokenAccountModel(
                                orchardId,
                                "0.00",
                                "0.00"
                            );

                            // An object of options to indicate the post for create
                            var post_ochardToken_options = buildPost('/createNewTokenAccount', JSON.stringify(orchardId));
                            var post_req_orchardToken = http.request(post_ochardToken_options, function (res) {
                                res.setEncoding('utf8');
                                res.on('data', function (chunk) {
                                    let responseOrchardToken = JSON.parse(chunk);
                                    let bodyOrchardToken = JSON.parse(responseOrchardToken.body);

                                    console.log('Response of Orchard Token: ');
                                    console.log(bodyOrchardToken);

                                    //DATA FOR CREATE ORGANIZATION ORCHARD
                                    var dataOrchardOrg = JSON.stringify({
                                        "email": "orchard",
                                        "pwd": "orchard",
                                        "name": "orchard",
                                        "organizationType": "LABEL",
                                        "traderId": orchardId
                                    });
                                    // An object of options to indicate where to post to
                                    var post_createOrganizationOrchard_options = buildPost('/createOrganization', dataOrchardOrg);
                                    var post_req_createOrganizationOrchard = http.request(post_createOrganizationOrchard_options, function (res) {
                                        res.setEncoding('utf8');
                                        res.on('data', function (chunk) {
                                            let responseOrganizationOrchard = JSON.parse(chunk);
                                            let bodyOrganizationOrchard = JSON.parse(responseOrganizationOrchard.body);

                                            console.log('Response of Creation of Orchard Organization: ');
                                            console.log(bodyOrganizationOrchard);

                                            //DATA FOR CREATE TRADER MEMBRAN
                                            let membranId = UUID();
                                            // Build the post of trader MEMBRAN
                                            var dataMembran = JSON.stringify({
                                                'traderId': membranId,
                                                'name': 'Membran',
                                                'email': 'membran@gmail.com',
                                                'balance': 0.00,
                                                'traderType': 'LABEL',
                                                'tokenAccountId': membranId,
                                                'traderHierarchy':3
                                            });
                                            // An object of options to indicate the post for create
                                            var post_createTraderMembran_options = buildPost('/createTrader', dataMembran);
                                            var post_req_createTraderMembran = http.request(post_createTraderMembran_options, function (res) {
                                                res.setEncoding('utf8');
                                                res.on('data', function (chunk) {
                                                    let responseTraderMembran = JSON.parse(chunk);
                                                    let bodyTraderMembran = JSON.parse(responseTraderMembran.body);

                                                    console.log('Response of trader Membran: ');
                                                    console.log(bodyTraderMembran);

                                                    //DATA CREAT MEMBRAN TOKEN 
                                                    let tokenAccountMembran = new TokenAccountModel(
                                                        membranId,
                                                        "0.00",
                                                        "0.00"
                                                    );

                                                    // An object of options to indicate the post for create
                                                    var post_createMembranToken_options = buildPost('/createNewTokenAccount', JSON.stringify(membranId));
                                                    var post_req_createMembranToken = http.request(post_createMembranToken_options, function (res) {
                                                        res.setEncoding('utf8');
                                                        res.on('data', function (chunk) {
                                                            let responseMembranToken = JSON.parse(chunk);
                                                            let bodyMembranToken = JSON.parse(responseMembranToken.body);

                                                            console.log('Response of Membran Token: ');
                                                            console.log(bodyMembranToken);

                                                            var dataMembrandOrg = JSON.stringify({
                                                                "email": "membran",
                                                                "pwd": "membran",
                                                                "name": "membran",
                                                                "organizationType": "LABEL",
                                                                "traderId": membranId
                                                            });
                                                            // An object of options to indicate where to post to
                                                            var post_createOrganizationMembran_options = buildPost('/createOrganization', dataMembrandOrg);
                                                            var post_req_createOrganizationMembran = http.request(post_createOrganizationMembran_options, function (res) {
                                                                res.setEncoding('utf8');
                                                                res.on('data', function (chunk) {
                                                                    let responseOrganizationMembran = JSON.parse(chunk);
                                                                    let bodyOrganizationMembran = JSON.parse(responseOrganizationMembran.body);

                                                                    console.log('Response of Creation of Membran Organization: ');
                                                                    console.log(bodyOrganizationMembran);

                                                                    //DATA FOR CREATE TRADER ARTIST
                                                                    let artistId = UUID();

                                                                    // Build the post of trader ARTIST
                                                                    var dataArtist = JSON.stringify({
                                                                        'traderId': artistId,
                                                                        'name': 'Artist',
                                                                        'email': 'artist@gmail.com',
                                                                        'balance': 0.00,
                                                                        'traderType': 'ARTIST',
                                                                        'tokenAccountId': artistId,
                                                                        'traderHierarchy':4
                                                                    });
                                                                    // An object of options to indicate the post for create
                                                                    var post_createTraderArtist_options = buildPost('/createTrader', dataArtist);
                                                                    var post_req_createTraderArtist = http.request(post_createTraderArtist_options, function (res) {
                                                                        res.setEncoding('utf8');
                                                                        res.on('data', function (chunk) {
                                                                            let responseTraderArtist = JSON.parse(chunk);
                                                                            let bodyTraderArtist = JSON.parse(responseTraderArtist.body);

                                                                            console.log('Response of trader Artist: ');
                                                                            console.log(bodyTraderArtist);

                                                                            //DATA FOR TOKEN ARTIST
                                                                            let tokenAccountArtist = new TokenAccountModel(
                                                                                artistId,
                                                                                "0.00",
                                                                                "0.00"
                                                                            );

                                                                            // An object of options to indicate the post for create
                                                                            var post_createArtistToken_options = buildPost('/createNewTokenAccount', JSON.stringify(artistId));
                                                                            var post_req_createArtistToken = http.request(post_createArtistToken_options, function (res) {
                                                                                res.setEncoding('utf8');
                                                                                res.on('data', function (chunk) {
                                                                                    let responseArtistToken = JSON.parse(chunk);
                                                                                    let bodyArtistToken = JSON.parse(responseArtistToken.body);

                                                                                    console.log('Response of trader Artist: ');
                                                                                    console.log(bodyArtistToken);

                                                                                    var dataArtistOrg = JSON.stringify({
                                                                                        "email": "artist",
                                                                                        "pwd": "artist",
                                                                                        "name": "artist",
                                                                                        "organizationType": "ARTIST",
                                                                                        "traderId": artistId
                                                                                    });
                                                                                    // An object of options to indicate where to post to
                                                                                    var post_createOrganizationArtist_options = buildPost('/createOrganization', dataArtistOrg);
                                                                                    var post_req_createOrganizationArtist = http.request(post_createOrganizationArtist_options, function (res) {
                                                                                        res.setEncoding('utf8');
                                                                                        res.on('data', function (chunk) {
                                                                                            let responseOrganizationArtist = JSON.parse(chunk);
                                                                                            let bodyOrganizationArtist = JSON.parse(responseOrganizationArtist.body);

                                                                                            console.log('Response of Creation of Artist Organization: ');
                                                                                            console.log(bodyOrganizationArtist);

                                                                                            let agreementId = UUID();

                                                                                            // //DATA FOR TX CREATE AGREEMENT
                                                                                            // var dataCreateAgreement1 = JSON.stringify({
                                                                                            //     "agreementId": agreementId,
                                                                                            //     "traderEmiterId": membranId,
                                                                                            //     "traderReceiverId": artistId,
                                                                                            //     "percentage": 0.10,
                                                                                            //     "status": "PENDING",
                                                                                            //     "isrc": trackId
                                                                                            // });

                                                                                            // // An object of options to indicate the post for create
                                                                                            // var post_createCreateAgreement_options1 = buildPost('/createAgreement', dataCreateAgreement1);
                                                                                            // var post_req_createAgreement1 = http.request(post_createCreateAgreement_options1, function (res) {
                                                                                            //     res.setEncoding('utf8');
                                                                                            //     res.on('data', function (chunk) {
                                                                                            //         let responseCreateAgreement1 = JSON.parse(chunk);
                                                                                            //         console.log('Server Test Creation Agreement:');
                                                                                            //         console.log(responseCreateAgreement1);

                                                                                            //         //DATA FOR TX DISTRIBUTION
                                                                                            //         var dataPaymentDistAuto = JSON.stringify({
                                                                                            //             "isrc": trackId,
                                                                                            //             "uploaderId": membranId
                                                                                            //         });
                                                                                            //         // An object of options to indicate the post for create
                                                                                            //         var post_paymentDist_options = buildPost('/paymentDistributionAutomatic', dataPaymentDistAuto);
                                                                                            //         var post_req_PaymentDist = http.request(post_paymentDist_options, function (res) {
                                                                                            //             res.setEncoding('utf8');
                                                                                            //             res.on('data', function (chunk) {
                                                                                            //                 let responsePaymentDist = JSON.parse(chunk);
                                                                                            //                 console.log('Server Test Distribution Process:');
                                                                                            //                 console.log(responsePaymentDist.body);
                                                                                            //                 //Now we must to know if each participant got the right payment

                                                                                            //                 // // An object of options to indicate the post for create
                                                                                            //                 var post_membranTrader_options = buildPost('/getTraderDetail', JSON.stringify(membranId));
                                                                                            //                 var post_req_membranTrader = http.request(post_membranTrader_options, function (res) {
                                                                                            //                     res.setEncoding('utf8');
                                                                                            //                     res.on('data', function (chunk) {
                                                                                            //                         let responseMembranTrader = JSON.parse(chunk);
                                                                                            //                         console.log('New Membran Information:********************');
                                                                                            //                         console.log(responseMembranTrader.body);

                                                                                            //                         // // An object of options to indicate the post for create
                                                                                            //                         var post_membranArtist_options = buildPost('/getTraderDetail', JSON.stringify(artistId));
                                                                                            //                         var post_req_artistTrader = http.request(post_membranArtist_options, function (res) {
                                                                                            //                             res.setEncoding('utf8');
                                                                                            //                             res.on('data', function (chunk) {
                                                                                            //                                 let responseArtistTrader = JSON.parse(chunk);
                                                                                            //                                 console.log('New Artist Information:*******************');
                                                                                            //                                 console.log(responseArtistTrader.body);

                                                                                            //                                 // // An object of options to indicate the post for create
                                                                                            //                                 var post_membranToken_options = buildPost('/getTokenAccountDetail', JSON.stringify(membranId));
                                                                                            //                                 var post_req_membranToken = http.request(post_membranToken_options, function (res) {
                                                                                            //                                     res.setEncoding('utf8');
                                                                                            //                                     res.on('data', function (chunk) {
                                                                                            //                                         let responseMembranTrader = JSON.parse(chunk);
                                                                                            //                                         console.log('New Token Membran Information:********************');
                                                                                            //                                         console.log(responseMembranTrader.body);

                                                                                            //                                         // // An object of options to indicate the post for create
                                                                                            //                                         var post_artistToken_options = buildPost('/getTokenAccountDetail', JSON.stringify(artistId));
                                                                                            //                                         var post_req_artistToken = http.request(post_artistToken_options, function (res) {
                                                                                            //                                             res.setEncoding('utf8');
                                                                                            //                                             res.on('data', function (chunk) {
                                                                                            //                                                 let responseArtistTrader = JSON.parse(chunk);
                                                                                            //                                                 console.log('New Token Artist Information:*******************');
                                                                                            //                                                 console.log(responseArtistTrader.body);
                                                                                            //                                             });
                                                                                            //                                         });
                                                                                            //                                         // get the data for payment distribution
                                                                                            //                                         post_req_artistToken.write(JSON.stringify(artistId));
                                                                                            //                                     });
                                                                                            //                                 });
                                                                                            //                                 // get the data for payment distribution
                                                                                            //                                 post_req_membranToken.write(JSON.stringify(membranId));

                                                                                            //                             });
                                                                                            //                         });
                                                                                            //                         // get the data for payment distribution
                                                                                            //                         post_req_artistTrader.write(JSON.stringify(artistId));
                                                                                            //                     });
                                                                                            //                 });
                                                                                            //                 // get the data for payment distribution
                                                                                            //                 post_req_membranTrader.write(JSON.stringify(membranId));
                                                                                            //             });
                                                                                            //         });
                                                                                            //         // post the data for payment distribution
                                                                                            //         post_req_PaymentDist.write(dataPaymentDistAuto);
                                                                                            //     });
                                                                                            // });
                                                                                            // post the data for creating agreement
                                                                                            // post_req_createAgreement1.write(dataCreateAgreement1);
                                                                                        });
                                                                                    });
                                                                                    // post the data for creating trader orchard
                                                                                    post_req_createOrganizationArtist.write(dataArtistOrg);
                                                                                });
                                                                            });
                                                                            // post the data for creating trader artist
                                                                            post_req_createArtistToken.write(JSON.stringify(artistId));
                                                                        });
                                                                    });
                                                                    // post the data for creating trader artist
                                                                    post_req_createTraderArtist.write(dataArtist);
                                                                });
                                                            });
                                                            // post the data for creating trader orchard
                                                            post_req_createOrganizationMembran.write(dataMembrandOrg);
                                                        });
                                                    });
                                                    // post the data for creating trader orchard
                                                    post_req_createMembranToken.write(JSON.stringify(membranId));
                                                });
                                            });
                                            // post the data for creating trader membran
                                            post_req_createTraderMembran.write(dataMembran);
                                        });
                                    });
                                    // post the data for creating trader orchard
                                    post_req_createOrganizationOrchard.write(dataOrchardOrg);
                                });
                            });
                            // post the data for creating trader orchard
                            post_req_orchardToken.write(JSON.stringify(orchardId));
                        });
                    });
                    // post the data for creating trader orchard
                    post_req_createTraderOrchard.write(dataOrchard);
                });
            });
            // post the data for creating track
            post_req_createTrack.write(dataTrack);
        });
    });
    // post the data for creating organization admin
    post_req_createOrganizationAdmin.write(dataAdmin);
    //post_req_createTrack.end();
}

function buildPost(endpoint, data) {
    // An object of options to indicate where to post to
    var postOptions = {
        host: 'localhost',
        port: '3011',
        path: endpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };
    return postOptions;
}

function buildGet(endpoint, data) {
    var get_options = {
        host: HOST,
        port: PORT,
        path: endpoint,
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    return get_options;
}
createTrackRequest();
