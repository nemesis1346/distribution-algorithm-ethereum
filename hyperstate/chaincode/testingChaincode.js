'use strict';
const winston = require('winston');
const UUID = require('uuid/v1');
const DataModel = require('../models/dataModel.js');
const Async = require('async');
const methods = require('../test/methods.js');

class TestingChaincode {
    constructor() {
    }
    /**
       * @description It authenticates a participant by the username and password with queries
       * @return {Promise} A promise that authenticates user
       * @param {email}
       * @param {pwd}
       */
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

            console.log('TOKEN TRADER 1');
            await methods.getTokenAccount(trader1);
            console.log('TOKEN TRADER 2');
            await methods.getTokenAccount(trader2);
            console.log('TOKEN TRADER 2');
            await methods.getTokenAccount(trader3);
            console.log('TOKEN TRADER 3');
            await methods.getTokenAccount(trader4);

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