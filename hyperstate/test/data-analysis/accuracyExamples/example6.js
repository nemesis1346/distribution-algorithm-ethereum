'use strict';
const UUID = require('uuid/v1');
const methods = require('../methods.js');

//must be seend in the distribution analysis in react app 
async function example6() {

    //INIT DATA////////////////////////////////////////////////////////////// 
    let trackId = 'example6';
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

    await methods.updateTrack(trackId, 1000);
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
    console.log('TOKEN TRADER 6')
    await methods.getTokenAccount(trader6);
    console.log('TOKEN TRADER 7')
    await methods.getTokenAccount(trader7);
}
example6();