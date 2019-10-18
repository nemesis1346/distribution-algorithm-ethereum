'use strict';
const UUID = require('uuid/v1');
const methods = require('../../requestsConnectionServer.js');

async function example2(){

   //INIT DATA//////////////////////////////////////////////////////////////
      let trackId = 'example2';
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

      await methods.updateTrack(trackId,100);
      await methods.distribution(trackId, trader2, String(new Date().toISOString()));
      await methods.updateTrack(trackId,200);
      await methods.distribution(trackId, trader1, String(new Date().toISOString()));
      await methods.updateTrack(track2Id,500);
      await methods.distribution(track2Id, trader2, String(new Date().toISOString()));

      console.log('TOKEN TRADER 2');
      await methods.getTokenAccount(trader2);
      console.log('TOKEN TRADER 3');
      await methods.getTokenAccount(trader3);
      console.log('TOKEN TRADER 4');
      await methods.getTokenAccount(trader4);
      console.log('TOKEN TRADER 1');
      await methods.getTokenAccount(trader1);
}
example2();