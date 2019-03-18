//Version 2
pragma solidity ^0.5.0;

//This is the best way to structure a digital entity in a contract
contract Tracks{
    
    struct Track{
        uint id;
        string isrc;
        string title;
        uint revenueTotal;
        address uploaderEOA;
    }

    mapping(uint=>Track) public tracks;


    function createTrack(uint id, string memory isrc, string memory title, uint revenueTotal) public{
        address uploaderEOA = msg.sender; 
        tracks[id]=Track(id, isrc, title, revenueTotal, uploaderEOA);
        emit LogTrack("Track created!!!"); //this is an event 

    }
    
    function getTrack(uint id) public returns(uint, string memory,string memory, uint, address) {
        return (tracks[id].id, tracks[id].isrc,tracks[id].title,tracks[id].revenueTotal,tracks[id].uploaderEOA);
    }
    
    event LogTrack(string);

}    
