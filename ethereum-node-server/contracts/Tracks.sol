pragma solidity ^0.5.0;

//This is the best way to structure a digital entity in a contract
contract Tracks{
    
    struct Track{
        uint id;
        string isrc;
        string title;
        uint revenueTotal;
        string uploaderId;
    }

    mapping(uint=>Track) public tracks;

    function createTrack(uint id, string memory isrc, string memory title, uint revenueTotal, string memory uploaderId) public{
        tracks[id]=Track(id,isrc,title, revenueTotal, uploaderId);
        //emit LogTrack("Track created!!!"); //this is an event 

    }
    
    function getTrack(uint id) public returns(uint, string memory,string memory, uint, string memory) {
        return (tracks[id].id, tracks[id].isrc,tracks[id].title,tracks[id].revenueTotal,tracks[id].uploaderId);
    }

    event LogTrack(string);
}    
