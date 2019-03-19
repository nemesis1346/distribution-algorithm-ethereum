//Version 2
pragma solidity ^0.5.0;

//This is the best way to structure a digital entity in a contract
contract TokenAccounts{
    
    struct TokenAccount{
        uint tokenAccountId;
        uint balanceEnabled;
        uint balanceDisabled;
        address traderEOA;
    }

    mapping(uint=>TokenAccount) public tokenAccounts;


    function createTokenAccounts(uint tokenAccountId) public{
        address traderEOA = msg.sender; 
        uint balanceEnabled=0;
        uint balanceDisabled=0;
        tokenAccounts[tokenAccountId]=TokenAccount(tokenAccountId, balanceEnabled, balanceDisabled, traderEOA);
        emit stringLogs("Tokent Account created!!!"); //this is an event 

    }
    
    function getTokenAccount(uint tokenAccountId) public returns(uint, uint, uint, address) {
        return (tokenAccounts[tokenAccountId].tokenAccountId,
                tokenAccounts[tokenAccountId].balanceEnabled,
                tokenAccounts[tokenAccountId].balanceDisabled,
                tokenAccounts[tokenAccountId].traderEOA);
    }
    
    event stringLogs(string);

}    
