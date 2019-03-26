pragma solidity ^0.5.0;
//pragma experimental 
contract TokenAccounts{
    function createTokenAccount(uint tokenAccountId) public payable{}
}

//This is the best way to structure a digital entity in a contract
contract Traders{
    TokenAccounts public tokenAccountsInterface;
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
        
        //We create the token account accessing the other contract
        tokenAccountsInterface = TokenAccounts(tokenAccountContractAddr);
        tokenAccountsInterface.createTokenAccount(id);
        emit stringLogs("Trader Was Created");
    }
    
    function getTrader(uint id) view public returns(uint, string memory,string memory, string memory,uint) {
        return (traders[id].id, traders[id].name,traders[id].email,traders[id].traderType, traders[id].tokenAccountId);
    }


    event stringLogs(string stringLogs);
}    
