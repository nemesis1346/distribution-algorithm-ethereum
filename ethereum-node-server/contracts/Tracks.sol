//Version 2
pragma solidity ^0.5.0;

//This is the best way to structure a digital entity in a contract
contract Tracks{
    
    struct Track{
        uint isrc;
        string title;
        uint revenueTotal;
        address uploaderEOA;
    }

    mapping(uint=>Track) public tracks;


    function createTrack(uint isrc, string memory title, uint revenueTotal) public{
        address uploaderEOA = msg.sender; 
        tracks[isrc]=Track(isrc, title, revenueTotal, uploaderEOA);
        emit LogTrack("Track created!!!"); //this is an event 

    }
    
    function getTrack(uint isrc) public returns(uint, string memory, uint, address) {
        return (tracks[isrc].isrc,tracks[isrc].title,tracks[isrc].revenueTotal,tracks[isrc].uploaderEOA);
    }
    
    event LogTrack(string);

}    
