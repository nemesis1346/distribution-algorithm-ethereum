'use strict';
const http = require('http');
const superagent = require('superagent');
const UUID = require('uuid/v1');
const TokenAccountModel = require('../models/tokenAccountModel.js');
const UserModel = require('../models/userModel.js');
const DistributionRequest = require('../models/distributionRequest.js');
const TrackModel = require('../models/trackModel.js');
const TraderModel = require('../models/traderModel.js');
const AgreementModel = require('../models/agreementModel.js');
const PORT = '3011';
const HOST = 'localhost';
const Timeout = require('await-timeout');
const AppleTrackData = require('../data/processedData/Apple_Streams_S1_80032046_1117_AU_for_201710_exampleJSON');
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
      let track2Id = UUID();
      await createTrack(track2Id, 'track2', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');
      let track3Id = UUID();
      await createTrack(track3Id, 'track3', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');
      let track4Id = UUID();
      await createTrack(track4Id, 'track4', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');

      await createUser('admin', 'admin', 'admin', 'ADMIN', null);
      let orchardId = UUID();
      await createParticipant(orchardId, 'The Orchard', 'orchard@gmail.com', 0.00, 'DISTRIBUTOR', orchardId);
      await createUser('orchard', 'orchard', 'orchard', 'DISTRIBUTOR', orchardId);
      let membranId = UUID();
      await createParticipant(membranId, 'Membran', 'membran@gmail.com', 0.00, 'DISTRIBUTOR', membranId);
      await createUser('membran', 'membran', 'membran', 'LABEL', membranId);
      let artist1Id = UUID();
      await createParticipant(artist1Id, 'Artist', 'artist@gmail.com', 0.00, 'ARTIST', artist1Id);
      await createUser('artist1', 'artist1', 'artist1', 'ARTIST', artist1Id);
      let artist2Id = UUID();
      await createParticipant(artist2Id, 'Artist2', 'artist@gmail.com', 0.00, 'ARTIST', artist2Id);
      await createUser('artist2', 'artist2', 'artist2', 'ARTIST', artist2Id);
      let artist3Id = UUID();
      await createParticipant(artist3Id, 'Artist3', 'artist@gmail.com', 0.00, 'ARTIST', artist3Id);
      await createUser('artist3', 'artist3', 'artist3', 'ARTIST', artist3Id);
      let artist4Id = UUID();
      await createParticipant(artist4Id, 'Artist4', 'artist@gmail.com', 0.00, 'ARTIST', artist4Id);
      await createUser('artist4', 'artist4', 'artist4', 'ARTIST', artist4Id);

      let labelId = UUID();
      await createParticipant(labelId, 'Label', 'Label@gmail.com', 0.00, 'LABEL', labelId)
      await createUser('label','label', 'label', 'LABEL', labelId)

      //await createAllTracksFromFile(orchardId);
      //////////////////////////////////////////////////////////////////////////

      //Example 1//////////////////////////////////////////////////////////////////
    //   let agreement1Id = UUID();
    //   await createAgreement(agreement1Id, membranId, artist1Id, 0.3, 'PENDING', trackId, 'Membran', 'Artist1');
    //   let agreement2Id = UUID();
    //   await createAgreement(agreement2Id, membranId, orchardId, 0.5, 'PENDING', trackId, 'Membran', 'Orchard');
    //   let agreement3Id = UUID();
    //   await createAgreement(agreement3Id, orchardId, artist2Id, 0.9, 'PENDING', trackId, 'Orchard', 'Artist2');
    //   await distribution(trackId, membranId, String(new Date().toISOString()));
    //   await distribution(trackId, membranId, String(new Date().toISOString()));

    //   console.log('TOKEN MEMBRAN');
    //   await getTokenAccount(membranId);
    //   console.log('TOKEN ARTIST 1');
    //   await getTokenAccount(artist1Id);
    //   console.log('TOKEN ARTIST 2');
    //   await getTokenAccount(artist2Id);
    //   console.log('TOKEN ORCHARD');
    //   await getTokenAccount(orchardId);

      //Example 2//////////////////////////////////////////////////////////////////
      //Track1
    //   let agreement1Id = UUID();
    //   await createAgreement(agreement1Id, membranId, artist1Id, 0.8, 'PENDING', trackId, 'Membran', 'Artist1');
    //   let agreement2Id = UUID();
    //   await createAgreement(agreement2Id, artist1Id, artist2Id, 0.75, 'PENDING', trackId, 'Artist1', 'Artist2');
    //   let agreement3Id = UUID();
    //   await createAgreement(agreement3Id, orchardId, membranId, 0.9, 'PENDING', trackId, 'Orchard', 'Membran');
    //   //Track 2
    //   let agreement4Id = UUID();
    //   await createAgreement(agreement4Id, membranId, artist1Id, 0.8, 'PENDING', track2Id, 'Membran', 'Artist1');
    //   let agreement5Id = UUID();
    //   await createAgreement(agreement5Id, artist1Id, artist2Id, 0.75, 'PENDING', track2Id, 'Artist1', 'Artist2');
    //   let agreement6Id = UUID();
    //   await createAgreement(agreement6Id, orchardId, membranId, 0.9, 'PENDING', track2Id, 'Orchard', 'Membran');

    //   await updateTrack(trackId,100);
    //   await distribution(trackId, membranId, String(new Date().toISOString()));
    //   await updateTrack(trackId,200);
    //   await distribution(trackId, orchardId, String(new Date().toISOString()));
    //   await updateTrack(track2Id,500);
    //   await distribution(track2Id, membranId, String(new Date().toISOString()));


    //   console.log('TOKEN MEMBRAN');
    //   await getTokenAccount(membranId);
    //   console.log('TOKEN ARTIST 1');
    //   await getTokenAccount(artist1Id);
    //   console.log('TOKEN ARTIST 2');
    //   await getTokenAccount(artist2Id);
    //   console.log('TOKEN ORCHARD');
    //   await getTokenAccount(orchardId);

      //EXAMPLE 3 ///////////////////////////////////////////////////////////////////(STILL MUST BE FIXED)
      //Track1
      // let agreement1Id = UUID();
      // await createAgreement(agreement1Id, orchardId, membranId, 0.25, 'PENDING', trackId, 'Orchard', 'Membran');
      // let agreement2Id = UUID();
      // await createAgreement(agreement2Id, membranId, artist1Id, 0.5, 'PENDING', trackId, 'Membran', 'Artist2');
      // let agreement3Id = UUID();
      // await createAgreement(agreement3Id, artist1Id, orchardId, 0.5, 'PENDING', trackId, 'Artist1', 'Orchard');
      // let agreement4Id = UUID();
      // await createAgreement(agreement4Id, orchardId, artist2Id, 0.25, 'PENDING', trackId, 'Orchard', 'Artist2');
      // //Track 2
      // let agreement5Id = UUID();
      // await createAgreement(agreement5Id, orchardId, membranId, 0.25, 'PENDING', track2Id, 'Orchard', 'Membran');
      // let agreement6Id = UUID();
      // await createAgreement(agreement6Id, membranId, artist1Id, 0.5, 'PENDING', track2Id, 'Membran', 'Artist2');
      // let agreement7Id = UUID();
      // await createAgreement(agreement7Id, artist1Id, orchardId, 0.5, 'PENDING', track2Id, 'Artist1', 'Orchard');
      // let agreement8Id = UUID();
      // await createAgreement(agreement8Id, orchardId, artist2Id, 0.25, 'PENDING', track2Id, 'Orchard', 'Artist2');
      // //Track 3
      // let agreement9Id = UUID();
      // await createAgreement(agreement9Id, orchardId, membranId, 0.25, 'PENDING', track3Id, 'Orchard', 'Membran');
      // let agreement10Id = UUID();
      // await createAgreement(agreement10Id, membranId, artist1Id, 0.5, 'PENDING', track3Id, 'Membran', 'Artist2');
      // let agreement11Id = UUID();
      // await createAgreement(agreement11Id, artist1Id, orchardId, 0.5, 'PENDING', track3Id, 'Artist1', 'Orchard');
      // let agreement12Id = UUID();
      // await createAgreement(agreement12Id, orchardId, artist2Id, 0.25, 'PENDING', track3Id, 'Orchard', 'Artist2');
      // //Track 4
      // let agreement13Id = UUID();
      // await createAgreement(agreement13Id, orchardId, membranId, 0.25, 'PENDING', track4Id, 'Orchard', 'Membran');
      // let agreement14Id = UUID();
      // await createAgreement(agreement14Id, membranId, artist1Id, 0.5, 'PENDING', track4Id, 'Membran', 'Artist2');
      // let agreement15Id = UUID();
      // await createAgreement(agreement15Id, artist1Id, orchardId, 0.5, 'PENDING', track4Id, 'Artist1', 'Orchard');
      // let agreement16Id = UUID();
      // await createAgreement(agreement16Id, orchardId, artist2Id, 0.25, 'PENDING', track4Id, 'Orchard', 'Artist2');

      // await updateTrack(trackId, 10);
      // await distribution(trackId, membranId, String(new Date().toISOString()));
      // await updateTrack(track2Id, 10);
      // await distribution(track2Id, membranId, String(new Date().toISOString()));
      // await updateTrack(track3Id, 10);
      // await distribution(track3Id, membranId, String(new Date().toISOString()));
      // await updateTrack(track4Id, 10);
      // await distribution(track4Id, membranId, String(new Date().toISOString()));

      // console.log('TOKEN MEMBRAN');
      // await getTokenAccount(membranId);
      // console.log('TOKEN ARTIST 1');
      // await getTokenAccount(artist1Id);
      // console.log('TOKEN ARTIST 2');
      // await getTokenAccount(artist2Id);
      // console.log('TOKEN ORCHARD');
      // await getTokenAccount(orchardId);

      //EXAMPLE 4///////////////////////////////////////////////////////////////////////////////
      //Track1
    //   let agreement1Id = UUID();
    //   await createAgreement(agreement1Id, membranId, artist1Id, 0.25, 'PENDING', trackId, 'Membran', 'Artist1');
    //   let agreement2Id = UUID();
    //   await createAgreement(agreement2Id, membranId, artist2Id, 0.25, 'PENDING', trackId, 'Membran', 'Artist2');
    //   let agreement3Id = UUID();
    //   await createAgreement(agreement3Id, artist1Id, orchardId, 0.5, 'PENDING', trackId, 'Artist1', 'Orchard');
    //   let agreement4Id = UUID();
    //   await createAgreement(agreement4Id, artist2Id, orchardId, 0.5, 'PENDING', trackId, 'Artist2', 'Orchard');
    //   let agreement5Id = UUID();
    //   await createAgreement(agreement5Id, orchardId, artist3Id, 0.5, 'PENDING', trackId, 'Orchard', 'Artist3');
    //   //Track2
    //   let agreement6Id = UUID();
    //   await createAgreement(agreement6Id, membranId, artist1Id, 0.25, 'PENDING', track2Id, 'Membran', 'Artist1');
    //   let agreement7Id = UUID();
    //   await createAgreement(agreement7Id, membranId, artist2Id, 0.25, 'PENDING', track2Id, 'Membran', 'Artist2');
    //   let agreement8Id = UUID();
    //   await createAgreement(agreement8Id, artist1Id, orchardId, 0.5, 'PENDING', track2Id, 'Artist1', 'Orchard');
    //   let agreement9Id = UUID();
    //   await createAgreement(agreement9Id, artist2Id, orchardId, 0.5, 'PENDING', track2Id, 'Artist2', 'Orchard');
    //   let agreement10Id = UUID();
    //   await createAgreement(agreement10Id, orchardId, artist3Id, 0.5, 'PENDING', track2Id, 'Orchard', 'Artist3');
    //   //Track3
    //   let agreement11Id = UUID();
    //   await createAgreement(agreement11Id, membranId, artist1Id, 0.25, 'PENDING', track3Id, 'Membran', 'Artist1');
    //   let agreement12Id = UUID();
    //   await createAgreement(agreement12Id, membranId, artist2Id, 0.25, 'PENDING', track3Id, 'Membran', 'Artist2');
    //   let agreement13Id = UUID();
    //   await createAgreement(agreement13Id, artist1Id, orchardId, 0.5, 'PENDING', track3Id, 'Artist1', 'Orchard');
    //   let agreement14Id = UUID();
    //   await createAgreement(agreement14Id, artist2Id, orchardId, 0.5, 'PENDING', track3Id, 'Artist2', 'Orchard');
    //   let agreement15Id = UUID();
    //   await createAgreement(agreement15Id, orchardId, artist3Id, 0.5, 'PENDING', track3Id, 'Orchard', 'Artist3');
    //   //Track4
    //   let agreement16Id = UUID();
    //   await createAgreement(agreement16Id, membranId, artist1Id, 0.25, 'PENDING', track4Id, 'Membran', 'Artist1');
    //   let agreement17Id = UUID();
    //   await createAgreement(agreement17Id, membranId, artist2Id, 0.25, 'PENDING', track4Id, 'Membran', 'Artist2');
    //   let agreement18Id = UUID();
    //   await createAgreement(agreement18Id, artist1Id, orchardId, 0.5, 'PENDING', track4Id, 'Artist1', 'Orchard');
    //   let agreement19Id = UUID();
    //   await createAgreement(agreement19Id, artist2Id, orchardId, 0.5, 'PENDING', track4Id, 'Artist2', 'Orchard');
    //   let agreement20Id = UUID();
    //   await createAgreement(agreement20Id, orchardId, artist3Id, 0.5, 'PENDING', track4Id, 'Orchard', 'Artist3');

    //   await updateTrack(trackId, 10);
    //   await distribution(trackId, membranId, String(new Date().toISOString()));
    //   await updateTrack(track2Id, 10);
    //   await distribution(track2Id, membranId, String(new Date().toISOString()));
    //   await updateTrack(track3Id, 10);
    //   await distribution(track3Id, membranId, String(new Date().toISOString()));
    //   await updateTrack(track4Id, 10);
    //   await distribution(track4Id, membranId, String(new Date().toISOString()));

    //   console.log('TOKEN MEMBRAN');
    //   await getTokenAccount(membranId);
    //   console.log('TOKEN ARTIST 1');
    //   await getTokenAccount(artist1Id);
    //   console.log('TOKEN ARTIST 2');
    //   await getTokenAccount(artist2Id);
    //   console.log('TOKEN ARTIST 3');
    //   await getTokenAccount(artist3Id);
    //   console.log('TOKEN ORCHARD');
    //   await getTokenAccount(orchardId);

      //EXAMPLE 5//////////////////////////////////////////////////////////////////////// IS WORKING 
      //Track1
    //   let agreement1Id = UUID();
    //   await createAgreement(agreement1Id, membranId, artist1Id, 0.25, 'PENDING', trackId, 'Membran', 'Artist1');
    //   let agreement2Id = UUID();
    //   await createAgreement(agreement2Id, membranId, artist2Id, 0.25, 'PENDING', trackId, 'Membran', 'Artist2');
    //   let agreement3Id = UUID();
    //   await createAgreement(agreement3Id, artist1Id, orchardId, 0.5, 'PENDING', trackId, 'Artist1', 'Orchard');
    //   let agreement4Id = UUID();
    //   await createAgreement(agreement4Id, artist2Id, artist3Id, 0.5, 'PENDING', trackId, 'Artist2', 'Artist3');
    //   let agreement5Id = UUID();
    //   await createAgreement(agreement5Id, orchardId, artist4Id, 0.5, 'PENDING', trackId, 'Orchard', 'Artist4');
    //   //Track2
    //   let agreement6Id = UUID();
    //   await createAgreement(agreement6Id, membranId, artist1Id, 0.25, 'PENDING', track2Id, 'Membran', 'Artist1');
    //   let agreement7Id = UUID();
    //   await createAgreement(agreement7Id, membranId, artist2Id, 0.25, 'PENDING', track2Id, 'Membran', 'Artist2');
    //   let agreement8Id = UUID();
    //   await createAgreement(agreement8Id, artist1Id, orchardId, 0.5, 'PENDING', track2Id, 'Artist1', 'Orchard');
    //   let agreement9Id = UUID();
    //   await createAgreement(agreement9Id, artist2Id, artist3Id, 0.5, 'PENDING', track2Id, 'Artist2', 'Artist3');
    //   let agreement10Id = UUID();
    //   await createAgreement(agreement10Id, orchardId, artist4Id, 0.5, 'PENDING', track2Id, 'Orchard', 'Artist4');
    //   //Track3
    //   let agreement11Id = UUID();
    //   await createAgreement(agreement11Id, membranId, artist1Id, 0.25, 'PENDING', track3Id, 'Membran', 'Artist1');
    //   let agreement12Id = UUID();
    //   await createAgreement(agreement12Id, membranId, artist2Id, 0.25, 'PENDING', track3Id, 'Membran', 'Artist2');
    //   let agreement13Id = UUID();
    //   await createAgreement(agreement13Id, artist1Id, orchardId, 0.5, 'PENDING', track3Id, 'Artist1', 'Orchard');
    //   let agreement14Id = UUID();
    //   await createAgreement(agreement14Id, artist2Id, artist3Id, 0.5, 'PENDING', track3Id, 'Artist2', 'Artist3');
    //   let agreement15Id = UUID();
    //   await createAgreement(agreement15Id, orchardId, artist4Id, 0.5, 'PENDING', track3Id, 'Orchard', 'Artist4');
    //   //Track4
    //   let agreement16Id = UUID();
    //   await createAgreement(agreement16Id, membranId, artist1Id, 0.25, 'PENDING', track4Id, 'Membran', 'Artist1');
    //   let agreement17Id = UUID();
    //   await createAgreement(agreement17Id, membranId, artist2Id, 0.25, 'PENDING', track4Id, 'Membran', 'Artist2');
    //   let agreement18Id = UUID();
    //   await createAgreement(agreement18Id, artist1Id, orchardId, 0.5, 'PENDING', track4Id, 'Artist1', 'Orchard');
    //   let agreement19Id = UUID();
    //   await createAgreement(agreement19Id, artist2Id, artist3Id, 0.5, 'PENDING', track4Id, 'Artist2', 'Artist3');
    //   let agreement20Id = UUID();
    //   await createAgreement(agreement20Id, orchardId, artist4Id, 0.5, 'PENDING', track4Id, 'Orchard', 'Artist4');

    //   await updateTrack(trackId, 10);
    //   await distribution(trackId, membranId, String(new Date().toISOString()));
    //   await updateTrack(track2Id, 10);
    //   await distribution(track2Id, membranId, String(new Date().toISOString()));
    //   await updateTrack(track3Id, 10);
    //   await distribution(track3Id, membranId, String(new Date().toISOString()));
    //   await updateTrack(track4Id, 10);
    //   await distribution(track4Id, membranId, String(new Date().toISOString()));

    //   //OPTIONAL FOR SECOND DISTRIBUTION
    //   await updateTrack(trackId, 10);
    //   await distribution(trackId, membranId, String(new Date().toISOString()));
    //   await updateTrack(track2Id, 10);
    //   await distribution(track2Id, membranId, String(new Date().toISOString()));
    //   await updateTrack(track3Id, 10);
    //   await distribution(track3Id, membranId, String(new Date().toISOString()));
    //   await updateTrack(track4Id, 10);
    //   await distribution(track4Id, membranId, String(new Date().toISOString()));


      //Example 6-------------------------------------------------------------
      let agreement21Id = UUID();
      await createAgreement(agreement21Id, orchardId, membranId, 0.9, 'PENDING', trackId, 'Orchard', 'Membran');
      let agreement22Id = UUID();
      await createAgreement(agreement22Id, membranId, artist1Id, 0.05, 'PENDING', trackId, 'Membran', 'Artist1');
      let agreement23Id = UUID();
      await createAgreement(agreement23Id, membranId, labelId, 0.05, 'PENDING', trackId, 'Membran', 'Label');
      let agreement24Id = UUID();
      await createAgreement(agreement24Id, membranId, artist2Id, 0.05, 'PENDING', trackId, 'Membran', 'Artist2');
      let agreement25Id = UUID();
      await createAgreement(agreement25Id, labelId, artist3Id, 0.4444, 'PENDING', trackId, 'Label', 'Artist3');
      let agreement26Id = UUID();
      await createAgreement(agreement26Id, labelId, artist4Id, 0.4444, 'PENDING', trackId, 'Label', 'Artist4');

      await updateTrack(trackId, 1000);
      await distribution(trackId, orchardId, String(new Date().toISOString()));
      
      console.log('TOKEN MEMBRAN');
      await getTokenAccount(membranId);
      console.log('TOKEN ARTIST 1');
      await getTokenAccount(artist1Id);
      console.log('TOKEN ARTIST 2');
      await getTokenAccount(artist2Id);
      console.log('TOKEN ARTIST 3');
      await getTokenAccount(artist3Id);
      console.log('TOKEN ARTIST 4');
      await getTokenAccount(artist4Id);
      console.log('TOKEN ORCHARD');
      await getTokenAccount(orchardId);
      console.log('TOKEN LABEL')
      await getTokenAccount(labelId)

      // await getTxByReceiverForBalance(artist3Id);
      // await getTxByEmiterForBalance(artist1Id);

        //Test create agreements
        // let agreement1Ex5Id = UUID();
        // await createAgreement(agreement1Ex5Id, membranId, artist1Id, 0.88, 'PENDING', trackId, 'Membran', 'Artist1');
        // let agreement2Ex5Id = UUID();
        // await createAgreement(agreement2Ex5Id, membranId, artist2Id, 0.25, 'PENDING', trackId, 'Membran', 'Artist2');

    } catch (error) {
        console.log('THIS IS SOMETHING DIFFERENT');
        console.error(error);
        return new Error(error);
    }
}

async function testingData() {
    // let trackId = UUID();
    // await createTrack(trackId, 'track', 10, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');
    // await uploadPaymentForArray(orchardId);
    // let agreement1Id = UUID();
    // await createAgreement(agreement1Id, orchardId, membranId, 0.3, 'PENDING',  trackId, 'Orchard', 'Membran');
    // let agreement2Id = UUID();
    // await createAgreement(agreement2Id, membranId, artistId, 0.5, 'PENDING',  trackId, 'Membran', 'Artist');
    // let agreement3Id = UUID();
    // await createAgreement(agreement3Id, artistId, artist2Id, 0.5, 'PENDING',  trackId, 'Artist', 'Artist2');
    // let agreement4Id = UUID();
    // await createAgreement(agreement4Id, orchardId, artist2Id, 0.25, 'PENDING',  trackId, 'Orchard', 'Artist2');
    //  await distribution(trackId, orchardId);
}

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


