'use strict';
const UUID = require('uuid/v1');
const methods = require('./methods.js');

async function example2(){
    //Example 2//////////////////////////////////////////////////////////////////
      Track1
      let agreement1Id = UUID();
      await methods.createAgreement(agreement1Id, membranId, artist1Id, 0.8, 'PENDING', trackId, 'Membran', 'Artist1');
      let agreement2Id = UUID();
      await methods.createAgreement(agreement2Id, artist1Id, artist2Id, 0.75, 'PENDING', trackId, 'Artist1', 'Artist2');
      let agreement3Id = UUID();
      await methods.createAgreement(agreement3Id, orchardId, membranId, 0.9, 'PENDING', trackId, 'Orchard', 'Membran');
      //Track 2
      let agreement4Id = UUID();
      await methods.createAgreement(agreement4Id, membranId, artist1Id, 0.8, 'PENDING', track2Id, 'Membran', 'Artist1');
      let agreement5Id = UUID();
      await methods.createAgreement(agreement5Id, artist1Id, artist2Id, 0.75, 'PENDING', track2Id, 'Artist1', 'Artist2');
      let agreement6Id = UUID();
      await methods.createAgreement(agreement6Id, orchardId, membranId, 0.9, 'PENDING', track2Id, 'Orchard', 'Membran');

      await methods.updateTrack(trackId,100);
      await methods.distribution(trackId, membranId, String(new Date().toISOString()));
      await methods.updateTrack(trackId,200);
      await methods.distribution(trackId, orchardId, String(new Date().toISOString()));
      await updateTrack(track2Id,500);
      await methods.distribution(track2Id, membranId, String(new Date().toISOString()));


      console.log('TOKEN MEMBRAN');
      await methods.getTokenAccount(membranId);
      console.log('TOKEN ARTIST 1');
      await methods.getTokenAccount(artist1Id);
      console.log('TOKEN ARTIST 2');
      await methods.getTokenAccount(artist2Id);
      console.log('TOKEN ORCHARD');
      await methods.getTokenAccount(orchardId);
}
example2();