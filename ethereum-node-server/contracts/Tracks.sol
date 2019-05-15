//Version 2
pragma solidity ^0.5.0;

//This is the best way to structure a digital entity in a contract
contract Tracks{
    
    struct Track{
        address id;
        uint isrc;
        string title;
        uint revenueTotal;
        address uploaderEOA;
        bool isTrack; //flag for controlling existence
    }

    mapping(address=>Track) public trackStructList;
    address[] public trackAddressList;  //this is the best way to record all the addresses, is the responsability of the client to deal with the looping

    function isTrack(address id) public view returns(bool){
        return trackStructList[id].isTrack;
    }

    function createTrack(address id, uint isrc, string memory title, uint revenueTotal) public{
        //We evaluate the existence of the same entity
        if(isTrack(id)) revert('Track already exists');
        
        address uploaderEOA = msg.sender; 
        trackStructList[id].id = id; //this is created in the network where you are in 
        trackStructList[id].isrc = isrc;
        trackStructList[id].title=title;
        trackStructList[id].revenueTotal=revenueTotal;
        trackStructList[id].uploaderEOA=uploaderEOA;
        trackStructList[id].isTrack=true;
        
        trackAddressList.push(id);
        
        emit LogTrack("Track created!!!"); //this is an event 

    }
    
    function getTrackCount() public view returns(uint count) {
        return trackAddressList.length;
    }
    
    function getTrack(address id) view public returns(address, uint, string memory, uint, address,bool) {
        return (trackStructList[id].id,
                trackStructList[id].isrc,
                trackStructList[id].title,
                trackStructList[id].revenueTotal,
                trackStructList[id].uploaderEOA,
                trackStructList[id].isTrack);
    }

    function updateTrackRevenue(address trackId, uint revenue) public{
        trackStructList[trackId].revenueTotal = revenue;
    }
    event LogTrack(string message);

}    
