pragma solidity ^0.5.0;
//pragma experimental 

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
    
    function getTrader(uint id) public payable returns(uint, string memory,string memory, uint, string memory,uint) {
        return (traders[id].id, traders[id].name,traders[id].email,traders[id].balance,traders[id].traderType, traders[id].tokenAccountId);
    }

    event LogTraderCreation(string);
}    
