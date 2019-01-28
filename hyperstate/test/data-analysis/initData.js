
/**
 * Test for requirement:
- 3 parties (A,B,C)
- 2 contracts (AB, BC)
- 1 track input ($10 revenue)
- 3 outputs (Payout to A, to B, and to C)
 */
async function initData(){
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
}