'use strict';
const UUID = require('uuid/v1');
const DataModel = require('../models/dataModel.js');
const methods = require('../test/methods.js');

class TestingChaincode {
    constructor() {
    }

    async example1() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Example1 in Composer.js: ');
        try {
            //INIT DATA////////////////////////////////////////////////////////////// 
            let trackId = UUID();
            await methods.createTrack(trackId, 'track', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');

            let trader1 = UUID();
            await methods.createParticipant(trader1, 'tarder1', 'trader1', 0.00, 'DISTRIBUTOR', trader1);
            let trader2 = UUID();
            await methods.createParticipant(trader2, 'trader2', 'trader2', 0.00, 'DISTRIBUTOR', trader2);
            let trader3 = UUID();
            await methods.createParticipant(trader3, 'trader3', 'trader3', 0.00, 'ARTIST', trader3);
            let trader4 = UUID();
            await methods.createParticipant(trader4, 'trader4', 'trader4', 0.00, 'ARTIST', trader4);

            //Example 1//////////////////////////////////////////////////////////////////
            let agreement1Id = UUID();
            await methods.createAgreement(agreement1Id, trader1, trader2, 0.3, 'PENDING', trackId, 'trader1', 'trader2');
            let agreement2Id = UUID();
            await methods.createAgreement(agreement2Id, trader1, trader3, 0.5, 'PENDING', trackId, 'trader1', 'trader3');
            let agreement3Id = UUID();
            await methods.createAgreement(agreement3Id, trader3, trader4, 0.9, 'PENDING', trackId, 'trader3', 'trader4');

            await methods.distribution(trackId, trader1, String(new Date().toISOString()));
            //await methods.distribution(trackId, trader1, String(new Date().toISOString())); //JUST ONE DISTRIBUTION

            // console.log('TOKEN TRADER 1');
            // await methods.getTokenAccount(trader1);
            // console.log('TOKEN TRADER 2');
            // await methods.getTokenAccount(trader2);
            // console.log('TOKEN TRADER 2');
            // await methods.getTokenAccount(trader3);
            // console.log('TOKEN TRADER 3');
            // await methods.getTokenAccount(trader4);

            dataModel.data = 'PROCESS TERMINATED';
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async example2() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Example2 in Composer.js: ');
        try {
            //INIT DATA////////////////////////////////////////////////////////////// 
            let trackId = UUID();
            await methods.createTrack(trackId, 'track', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');
            let track2Id = UUID();
            await methods.createTrack(track2Id, 'track2', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');

            let trader1 = UUID();
            await methods.createParticipant(trader1, 'trader1', 'trader1', 0.00, 'DISTRIBUTOR', trader1);
            let trader2 = UUID();
            await methods.createParticipant(trader2, 'trader2', 'trader2', 0.00, 'DISTRIBUTOR', trader2);
            let trader3 = UUID();
            await methods.createParticipant(trader3, 'trader3', 'trader3', 0.00, 'ARTIST', trader3);
            let trader4 = UUID();
            await methods.createParticipant(trader4, 'trader4', 'trader4', 0.00, 'ARTIST', trader4);

            //Example 2//////////////////////////////////////////////////////////////////
            //  Track1
            let agreement1Id = UUID();
            await methods.createAgreement(agreement1Id, trader2, trader3, 0.8, 'PENDING', trackId, 'trader2', 'trader3');
            let agreement2Id = UUID();
            await methods.createAgreement(agreement2Id, trader3, trader4, 0.75, 'PENDING', trackId, 'trader3', 'trader4');
            let agreement3Id = UUID();
            await methods.createAgreement(agreement3Id, trader1, trader2, 0.9, 'PENDING', trackId, 'trader1', 'trader2');
            //Track 2
            let agreement4Id = UUID();
            await methods.createAgreement(agreement4Id, trader2, trader3, 0.8, 'PENDING', track2Id, 'trader2', 'trader3');
            let agreement5Id = UUID();
            await methods.createAgreement(agreement5Id, trader3, trader4, 0.75, 'PENDING', track2Id, 'trader3', 'trader4');
            let agreement6Id = UUID();
            await methods.createAgreement(agreement6Id, trader1, trader2, 0.9, 'PENDING', track2Id, 'trader1', 'trader2');

            await methods.distribution(trackId, trader2, String(new Date().toISOString()));
            await methods.distribution(trackId, trader1, String(new Date().toISOString()));
            await methods.distribution(track2Id, trader2, String(new Date().toISOString()));

            // console.log('TOKEN TRADER 2');
            // await methods.getTokenAccount(trader2);
            // console.log('TOKEN TRADER 3');
            // await methods.getTokenAccount(trader3);
            // console.log('TOKEN TRADER 4');
            // await methods.getTokenAccount(trader4);
            // console.log('TOKEN TRADER 1');
            // await methods.getTokenAccount(trader1);

            dataModel.data = 'PROCESS TERMINATED';
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async example3_scenario3() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Example3_scenario3 in Composer.js: ');
        try {
            //INIT DATA////////////////////////////////////////////////////////////// 
            let trackId = UUID();
            await methods.createTrack(trackId, 'track', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');

            let trader1 = UUID();
            await methods.createParticipant(trader1, 'trader1', 'trader1', 0.00, 'DISTRIBUTOR', trader1);
            let trader2 = UUID();
            await methods.createParticipant(trader2, 'trader2', 'trader2', 0.00, 'DISTRIBUTOR', trader2);
            let trader3 = UUID();
            await methods.createParticipant(trader3, 'trader3', 'trader3', 0.00, 'ARTIST', trader3);
            let trader4 = UUID();
            await methods.createParticipant(trader4, 'trader4', 'trader4', 0.00, 'ARTIST', trader4);

            //EXAMPLE 3 ///////////////////////////////////////////////////////////////////(STILL MUST BE FIXED)
            //Track1
            let agreement1Id = UUID();
            await methods.createAgreement(agreement1Id, trader1, trader2, 0.25, 'PENDING', trackId, 'trader1', 'trader2');
            let agreement2Id = UUID();
            await methods.createAgreement(agreement2Id, trader2, trader3, 0.5, 'PENDING', trackId, 'trader2', 'trader4');
            let agreement3Id = UUID();
            await methods.createAgreement(agreement3Id, trader3, trader1, 0.5, 'PENDING', trackId, 'trader3', 'trader1');
            let agreement4Id = UUID();
            await methods.createAgreement(agreement4Id, trader1, trader4, 0.25, 'PENDING', trackId, 'trader1', 'trader4');

            await methods.distribution(trackId, trader2, String(new Date().toISOString()));

            // console.log('TOKEN TRADER 1');
            // await methods.getTokenAccount(trader1);
            // console.log('TOKEN TRADER 2');
            // await methods.getTokenAccount(trader2);
            // console.log('TOKEN TRADER 3');
            // await methods.getTokenAccount(trader3);
            // console.log('TOKEN TRADER 4');
            // await methods.getTokenAccount(trader4);

            dataModel.data = 'PROCESS TERMINATED';
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async  example4_scenario1() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Example4_scenario1 in Composer.js: ');
        try {
            //INIT DATA////////////////////////////////////////////////////////////// 
            let trackId = UUID();
            await methods.createTrack(trackId, 'track', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');

            let trader1 = UUID();
            await methods.createParticipant(trader1, 'trader1', 'trader1', 0.00, 'DISTRIBUTOR', trader1);
            let trader2 = UUID();
            await methods.createParticipant(trader2, 'trader2', 'trader2', 0.00, 'DISTRIBUTOR', trader2);
            let trader3 = UUID();
            await methods.createParticipant(trader3, 'trader3', 'trader3', 0.00, 'ARTIST', trader3);
            let trader4 = UUID();
            await methods.createParticipant(trader4, 'trader4', 'trader4', 0.00, 'ARTIST', trader4);
            let trader5 = UUID();
            await methods.createParticipant(trader5, 'trader5', 'trader5', 0.00, 'ARTIST', trader5);

            //EXAMPLE 4///////////////////////////////////////////////////////////////////////////////
            //Track1
            let agreement1Id = UUID();
            await methods.createAgreement(agreement1Id, trader1, trader2, 0.25, 'PENDING', trackId, 'trader1', 'trader2');
            let agreement2Id = UUID();
            await methods.createAgreement(agreement2Id, trader1, trader3, 0.25, 'PENDING', trackId, 'trader1', 'trader3');
            let agreement3Id = UUID();
            await methods.createAgreement(agreement3Id, trader2, trader4, 0.5, 'PENDING', trackId, 'trader2', 'trader4');
            let agreement4Id = UUID();
            await methods.createAgreement(agreement4Id, trader3, trader4, 0.5, 'PENDING', trackId, 'trader3', 'trader4');
            let agreement5Id = UUID();
            await methods.createAgreement(agreement5Id, trader4, trader5, 0.5, 'PENDING', trackId, 'trader4', 'trader5');

            await methods.distribution(trackId, trader1, String(new Date().toISOString()));

            // console.log('TOKEN TRADER 1');
            // await methods.getTokenAccount(trader1);
            // console.log('TOKEN TRADER 2');
            // await methods.getTokenAccount(trader2);
            // console.log('TOKEN TRADER 3');
            // await methods.getTokenAccount(trader3);
            // console.log('TOKEN TRADER 4');
            // await methods.getTokenAccount(trader4);
            // console.log('TOKEN TRADER 5');
            // await methods.getTokenAccount(trader5);

            dataModel.data = 'PROCESS TERMINATED';
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async  example5_scenario2() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Example5_scenario2 in Composer.js: ');
        try {
            //INIT DATA////////////////////////////////////////////////////////////// 
            let trackId = UUID();
            await methods.createTrack(trackId, 'track', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');

            let trader1 = UUID();
            await methods.createParticipant(trader1, 'trader1', 'trader1', 0.00, 'DISTRIBUTOR', trader1);
            let trader2 = UUID();
            await methods.createParticipant(trader2, 'trader2', 'trader2', 0.00, 'DISTRIBUTOR', trader2);
            let trader3 = UUID();
            await methods.createParticipant(trader3, 'trader3', 'trader3', 0.00, 'ARTIST', trader3);
            let trader4 = UUID();
            await methods.createParticipant(trader4, 'trader4', 'trader4', 0.00, 'ARTIST', trader4);
            let trader5 = UUID();
            await methods.createParticipant(trader5, 'trader5', 'trader5', 0.00, 'ARTIST', trader5);
            let trader6 = UUID();
            await methods.createParticipant(trader6, 'trader6', 'trader6', 0.00, 'ARTIST', trader6);

            //EXAMPLE 5//////////////////////////////////////////////////////////////////////// IS WORKING 
            //Track1
            let agreement1Id = UUID();
            await methods.createAgreement(agreement1Id, trader1, trader2, 0.25, 'PENDING', trackId, 'trader1', 'trader2');
            let agreement2Id = UUID();
            await methods.createAgreement(agreement2Id, trader1, trader3, 0.25, 'PENDING', trackId, 'trader1', 'trader3');
            let agreement3Id = UUID();
            await methods.createAgreement(agreement3Id, trader2, trader4, 0.5, 'PENDING', trackId, 'trader2', 'trader4');
            let agreement4Id = UUID();
            await methods.createAgreement(agreement4Id, trader3, trader5, 0.5, 'PENDING', trackId, 'trader3', 'trader5');
            let agreement5Id = UUID();
            await methods.createAgreement(agreement5Id, trader4, trader6, 0.5, 'PENDING', trackId, 'trader4', 'trader6');

            await methods.distribution(trackId, trader1, String(new Date().toISOString()));

            // console.log('TOKEN TRADER 1');
            // await methods.getTokenAccount(trader1);
            // console.log('TOKEN TRADER 2');
            // await methods.getTokenAccount(trader2);
            // console.log('TOKEN TRADER 3');
            // await methods.getTokenAccount(trader3);
            // console.log('TOKEN TRADER 4');
            // await methods.getTokenAccount(trader4);
            // console.log('TOKEN TRADER 5');
            // await methods.getTokenAccount(trader5);
            // console.log('TOKEN TRADER 6');
            // await methods.getTokenAccount(trader6);

            dataModel.data = 'PROCESS TERMINATED';
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async  example6() {
        let dataModel = new DataModel(null, null, null);
        console.log('************************************');
        console.log('Request Example5_scenario2 in Composer.js: ');
        try {
            //INIT DATA///////////////////////////////////////////////////////////// 
            let trackId = UUID();
            await methods.createTrack(trackId, 'track', 100, 'vendorIdentifier', 'trader4', 'author', 'MUSICIAN');

            let trader1 = UUID();
            await methods.createParticipant(trader1, 'trader1', 'trader1', 0.00, 'DISTRIBUTOR', trader1);
            let trader2 = UUID();
            await methods.createParticipant(trader2, 'trader2', 'trader2', 0.00, 'DISTRIBUTOR', trader2);
            let trader3 = UUID();
            await methods.createParticipant(trader3, 'trader3', 'trader3', 0.00, 'ARTIST', trader3);
            let trader4 = UUID();
            await methods.createParticipant(trader4, 'trader4', 'trader4', 0.00, 'ARTIST', trader4);
            let trader5 = UUID();
            await methods.createParticipant(trader5, 'trader5', 'trader5', 0.00, 'DISTRIBUTOR', trader5);
            let trader6 = UUID();
            await methods.createParticipant(trader6, 'trader6', 'trader6', 0.00, 'ARTIST', trader6);
            let trader7 = UUID();
            await methods.createParticipant(trader7, 'trader7', 'trader7', 0.00, 'ARTIST', trader7);

            //Example 6-------------------------------------------------------------
            let agreement21Id = UUID();
            await methods.createAgreement(agreement21Id, trader1, trader2, 0.9, 'PENDING', trackId, 'trader1', 'trader2');
            let agreement22Id = UUID();
            await methods.createAgreement(agreement22Id, trader2, trader3, 0.05, 'PENDING', trackId, 'trader2', 'trader3');
            let agreement23Id = UUID();
            await methods.createAgreement(agreement23Id, trader2, trader4, 0.05, 'PENDING', trackId, 'trader2', 'trader4');
            let agreement24Id = UUID();
            await methods.createAgreement(agreement24Id, trader2, trader5, 0.05, 'PENDING', trackId, 'trader2', 'trader5');
            let agreement25Id = UUID();
            await methods.createAgreement(agreement25Id, trader4, trader6, 0.4444, 'PENDING', trackId, 'trader4', 'trader6');
            let agreement26Id = UUID();
            await methods.createAgreement(agreement26Id, trader4, trader7, 0.4444, 'PENDING', trackId, 'trader4', 'trader7');

            await methods.distribution(trackId, trader1, String(new Date().toISOString()));

            // console.log('TOKEN TRADER 1');
            // await methods.getTokenAccount(trader1);
            // console.log('TOKEN TRADER 2');
            // await methods.getTokenAccount(trader2);
            // console.log('TOKEN TRADER 3');
            // await methods.getTokenAccount(trader3);
            // console.log('TOKEN TRADER 4');
            // await methods.getTokenAccount(trader4);
            // console.log('TOKEN TRADER 5');
            // await methods.getTokenAccount(trader5);
            // console.log('TOKEN TRADER 6')
            // await methods.getTokenAccount(trader6);
            // console.log('TOKEN TRADER 7')
            // await methods.getTokenAccount(trader7);
           
            dataModel.data = 'PROCESS TERMINATED';
            dataModel.status = '200';
            return dataModel;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = TestingChaincode;