'use strict';
const UUID = require('uuid/v1');
const methods = require('../../methods.js');

async function example5() {
    var startDate = new Date();

    //INIT DATA////////////////////////////////////////////////////////////// 
    let trackId =UUID();
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

    await methods.updateTrack(trackId, 10);
    await methods.distribution(trackId, trader1, String(new Date().toISOString()));
    await methods.updateTrack(trackId, 10);
    await methods.distribution(trackId, trader1, String(new Date().toISOString()));
    await methods.updateTrack(trackId, 10);
    await methods.distribution(trackId, trader1, String(new Date().toISOString()));
    await methods.updateTrack(trackId, 10);
    await methods.distribution(trackId, trader1, String(new Date().toISOString()));
    
    console.log('TOKEN TRADER 1');
    await methods.getTokenAccount(trader1);
    console.log('TOKEN TRADER 2');
    await methods.getTokenAccount(trader2);
    console.log('TOKEN TRADER 3');
    await methods.getTokenAccount(trader3);
    console.log('TOKEN TRADER 4');
    await methods.getTokenAccount(trader4);
    console.log('TOKEN TRADER 5');
    await methods.getTokenAccount(trader5);
    console.log('TOKEN TRADER 6');
    await methods.getTokenAccount(trader6);

    // Do your operations
    var endDate   = new Date();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log(seconds);
}

example5();