//Here i m saving all the data
async function example6() {
    try {

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