pragma solidity ^0.5.0;
//pragma experimental 
contract TokenAccounts{
    function createTokenAccounts(uint tokenAccountId) public{}
}

//This is the best way to structure a digital entity in a contract
contract Traders{
    
    struct Trader{
        uint id;
        string name;
        string email;
        string traderType;
        uint tokenAccountId;
        address tradersEOA;
    }

    mapping(uint=>Trader) public traders;

    function createTrader(uint id, string memory name, string memory email, string memory traderType, uint tokenAccount, address tokenAccountContractAddr) public{
        address tradersEOA = msg.sender; 
        traders[id]=Trader(id,name, email, traderType, tokenAccount,tradersEOA);
        emit LogTraderCreation("Trader created!!!"); //this is an event 
        
        //We create the token account accessing the other contract
        TokenAccounts tokenAccountsInterface = TokenAccounts(tokenAccountContractAddr);
        tokenAccountsInterface.createTokenAccounts(id);
    }
    
    function getTrader(uint id) public returns(uint, string memory,string memory, string memory,uint) {
        return (traders[id].id, traders[id].name,traders[id].email,traders[id].traderType, traders[id].tokenAccountId);
    }

    function test(string memory message) public returns(string memory){
        return (message);
    }

    event LogTraderCreation(string);
}    
