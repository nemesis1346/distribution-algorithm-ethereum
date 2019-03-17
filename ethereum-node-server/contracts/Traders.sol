pragma solidity ^0.5.0;

//This is the best way to structure a digital entity in a contract
contract Traders{
    
    struct Trader{
        uint id;
        string name;
        string email;
        uint balance;
        string traderType;
        uint tokenAccountId;
    }

    mapping(uint=>Trader) public traders;

    function createTrader(uint id, string memory name, string memory email, uint balance, string memory traderType, uint tokenAccount) public{
        traders[id]=Trader(id,name, email, balance, traderType, tokenAccount);
        emit LogTraderCreation("Trader created!!!"); //this is an event 

    }
    
    function getTrader(uint id) public returns(uint, string memory,string memory, uint, string memory,uint) {
        return (traders[id].id, traders[id].name,traders[id].email,traders[id].balance,traders[id].traderType, traders[id].tokenAccountId);
    }

    event LogTraderCreation(string);
}    


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


    function createTrack(uint id, string memory isrc, string memory title, uint revenueTotal, string memory uploaderId) public{
        address uploaderEOA = msg.sender; 
        tracks[id]=Track(id, isrc, title, revenueTotal, uploaderEOA);
        emit LogTrack("Track created!!!"); //this is an event 

    }
    
    function getTrack(uint id) public returns(uint, string memory,string memory, uint, address) {
        return (tracks[id].id, tracks[id].isrc,tracks[id].title,tracks[id].revenueTotal,tracks[id].uploaderEOA);
    }

    event LogTrack(string);

}    