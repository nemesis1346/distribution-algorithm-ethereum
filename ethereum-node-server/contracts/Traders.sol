pragma solidity ^0.5.0;
//pragma experimental 
contract TokenAccounts{
    function createTokenAccount(address tokenAccountId) public payable{}
}

//This is the best way to structure a digital entity in a contract
contract Traders{
    TokenAccounts public tokenAccountsInterface;
    struct Trader{
        address id;
        string name;
        string email;
        string traderType;
        address tokenAccountId;
        bool isTrader;
    }

    mapping(address=>Trader) public traderStructList;
    address[] public traderAddressList;
    
     function isTrader(address id) public view returns(bool){
        return traderStructList[id].isTrader;
    }

    function createTrader(address id, string memory name, string memory email, string memory traderType, address tokenAccountCtrAdd, address tokenAccountId) public{
        if(isTrader(id)) revert();

       traderStructList[id].id = id;
       traderStructList[id].name = name;
       traderStructList[id].email=email;
       traderStructList[id].traderType=traderType;
       traderStructList[id].tokenAccountId=tokenAccountId;
        traderStructList[id].isTrader =true;
        
        traderAddressList.push(id);
        
        //We create the token account accessing the other contract
        tokenAccountsInterface = TokenAccounts(tokenAccountCtrAdd);
        tokenAccountsInterface.createTokenAccount(tokenAccountId);
        emit stringLogs("Trader Was Created");
    }
    
     function getTraderCount() public view returns(uint count) {
        return traderAddressList.length;
    }
    
    function getTrader(address id) view public returns(address, string memory,string memory, string memory,address) {
        return (traderStructList[id].id, 
        traderStructList[id].name,
        traderStructList[id].email,
        traderStructList[id].traderType, 
        traderStructList[id].tokenAccountId);
    }


    event stringLogs(string);
}    
