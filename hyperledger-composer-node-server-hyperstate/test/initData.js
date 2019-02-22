
'use strict';
const UUID = require('uuid/v1');
const methods = require('./methods.js')

exports.initData=async function(){
      //INIT DATA////////////////////////////////////////////////////////////// (THIS IS THE DATA OF MEMBRAN)
      let trackId = UUID();
      await methods.createTrack(trackId, 'track', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');
      let track2Id = UUID();
      await methods.createTrack(track2Id, 'track2', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');
      let track3Id = UUID();
      await methods.createTrack(track3Id, 'track3', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');
      let track4Id = UUID();
      await methods.createTrack(track4Id, 'track4', 100, 'vendorIdentifier', 'label', 'author', 'MUSICIAN');

      await methods.createUser('admin', 'admin', 'admin', 'ADMIN', null);
      let orchardId = UUID();
      await methods.createParticipant(orchardId, 'The Orchard', 'orchard@gmail.com', 0.00, 'DISTRIBUTOR', orchardId);
      await methods.createUser('orchard', 'orchard', 'orchard', 'DISTRIBUTOR', orchardId);
      let membranId = UUID();
      await methods.createParticipant(membranId, 'Membran', 'membran@gmail.com', 0.00, 'DISTRIBUTOR', membranId);
      await methods.createUser('membran', 'membran', 'membran', 'LABEL', membranId);
      let artist1Id = UUID();
      await methods.createParticipant(artist1Id, 'Artist', 'artist@gmail.com', 0.00, 'ARTIST', artist1Id);
      await methods.createUser('artist1', 'artist1', 'artist1', 'ARTIST', artist1Id);
      let artist2Id = UUID();
      await methods.createParticipant(artist2Id, 'Artist2', 'artist@gmail.com', 0.00, 'ARTIST', artist2Id);
      await methods.createUser('artist2', 'artist2', 'artist2', 'ARTIST', artist2Id);
      let artist3Id = UUID();
      await methods.createParticipant(artist3Id, 'Artist3', 'artist@gmail.com', 0.00, 'ARTIST', artist3Id);
      await methods.createUser('artist3', 'artist3', 'artist3', 'ARTIST', artist3Id);
      let artist4Id = UUID();
      await methods.createParticipant(artist4Id, 'Artist4', 'artist@gmail.com', 0.00, 'ARTIST', artist4Id);
      await methods.createUser('artist4', 'artist4', 'artist4', 'ARTIST', artist4Id);

      let labelId = UUID();
      await methods.createParticipant(labelId, 'Label', 'Label@gmail.com', 0.00, 'LABEL', labelId)
      await methods.createUser('label','label', 'label', 'LABEL', labelId)

      //await methods.createAllTracksFromFile(orchardId);
      //////////////////////////////////////////////////////////////////////////
}

