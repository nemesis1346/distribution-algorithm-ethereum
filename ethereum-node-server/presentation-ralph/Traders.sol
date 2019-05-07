pragma solidity ^0.5.0;

contract Traders{
    struct Trader{
        address id;
        string name;
        bool isTrader;
    }

    mapping(address=>Trader) public traderStructList;
    address[] public traderAddressList;
    
     function isTrader(address id) public view returns(bool){
        return traderStructList[id].isTrader;
    }

    function createTrader(address id, string memory name) public{
        if(isTrader(id)) revert("trader already exists");

       traderStructList[id].id = id;
       traderStructList[id].name = name;
        traderStructList[id].isTrader =true;
        
        traderAddressList.push(id);
        
        emit stringLogs("Trader Was Created");
    }
    
     function getTraderCount() public view returns(uint count) {
        return traderAddressList.length;
    }
    
    function getTrader(address id) view public returns(address, string memory) {
        return (traderStructList[id].id, 
        traderStructList[id].name);
    }


    event stringLogs(string logs);
}    