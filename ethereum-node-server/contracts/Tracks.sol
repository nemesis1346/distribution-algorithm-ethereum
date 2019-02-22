pragma solidity ^0.4.17;

contract Tracks{
    struct Track{
        string id;
        string isrc;
        string title;
        uint revenueTotal;
        string uploaderId;
    }
    mapping(uint=>Track) public tracks;

    uint public tracksCount;

    function createTrack(string memory id, string memory isrc, string memory title, uint revenueTotal, string memory uploaderId) public{
        tracksCount++;
        tracks[tracksCount]=Track(id,isrc,title, revenueTotal, uploaderId);
    }

}    