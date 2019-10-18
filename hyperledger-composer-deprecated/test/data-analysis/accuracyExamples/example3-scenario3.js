'use strict';
const UUID = require('uuid/v1');
const methods = require('../../requestsConnectionServer.js');

//FAILING
async function example3() {

      //INIT DATA//////////////////////////////////////////////////////////////
      let trackId = 'example3';
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

      await methods.updateTrack(trackId, 10);
      await methods.distribution(trackId, trader2, String(new Date().toISOString()));
      await methods.updateTrack(trackId, 10);
      await methods.distribution(trackId, trader2, String(new Date().toISOString()));
      await methods.updateTrack(trackId, 10);
      await methods.distribution(trackId, trader2, String(new Date().toISOString()));
      await methods.updateTrack(trackId, 10);
      await methods.distribution(trackId, trader2, String(new Date().toISOString()));

      console.log('TOKEN TRADER 1');
      await methods.getTokenAccount(trader1);
      console.log('TOKEN TRADER 2');
      await methods.getTokenAccount(trader2);
      console.log('TOKEN TRADER 3');
      await methods.getTokenAccount(trader3);
      console.log('TOKEN TRADER 4');
      await methods.getTokenAccount(trader4);
}

example3();