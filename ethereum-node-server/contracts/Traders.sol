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
        address tokenAccountId;
        bool isTrader;
    }

    mapping(address=>Trader) public traderStructList;
    address[] public traderAddressList;
    
     function isTrader(address id) public view returns(bool){
        return traderStructList[id].isTrader;
    }

    function createTrader(address id, string memory name, address tokenAccountId,address tokenAccountCtrAdd) public{
        if(isTrader(id)) revert('Trader already created');

       traderStructList[id].id = id;
       traderStructList[id].name = name;
       traderStructList[id].tokenAccountId=tokenAccountId;
        traderStructList[id].isTrader =true;
        
        traderAddressList.push(id);
        emit stringLogs("Trader Was Created");

        //We create the token account accessing the other contract
        tokenAccountsInterface = TokenAccounts(tokenAccountCtrAdd);
        tokenAccountsInterface.createTokenAccount(tokenAccountId);
        emit stringLogs("Token Account Was Created in Trader Contract");
    }
    
     function getTraderCount() public view returns(uint count) {
        return traderAddressList.length;
    }
    
    function getTrader(address id) view public returns(address, string memory,address) {
        return (traderStructList[id].id, 
        traderStructList[id].name,
        traderStructList[id].tokenAccountId);
    }


    event stringLogs(string logs);
}    
