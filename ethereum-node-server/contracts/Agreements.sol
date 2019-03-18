pragma solidity ^0.5.0;
import "./Tracks.sol";
import "./Traders.sol";

//This is the best way to structure a digital entity in a contract
contract Agreements{
    
    struct Agreement{
        uint id;
        uint traderEmitterId;
        uint traderReceiverId;
        uint percentage;
        string status;
        uint isrc;
        string traderEmiterName;
        string traderReceiverName;
    }

    mapping(uint=>Agreement) public agreements;

    function createAgreement(uint id, 
                            uint traderEmitterId, 
                            uint traderReceiverId, 
                            uint percentage, 
                            string memory status, 
                            uint isrc,
                            string memory traderEmiterName,
                            string memory traderReceiverName
                            ) public{
      

        agreements[id]=Agreement(id,traderEmitterId, traderReceiverId, percentage, status, isrc,traderEmiterName, traderReceiverName);
        
        //require(existEmitter(traderEmitterId));
        emit LogTraderCreation("Agreement created!!!"); //this is an event 

    }
    function existEmitter(uint traderEmitterId) public returns(bool){
          //We get the other traders                        
        Traders tradersInterface = new Traders();
        
        //We declare the variables of the Emitter
        //uint idEmitter;
        //string memory nameEmitter;
        //string memory emailEmitter;
        //uint balanceEmitter;
        //string memory traderTypeEmitter;
    //    uint tokenAccountIdEmitter;
        
        (uint idEmitter,string memory nameEmitter, string memory emailEmitter, uint balanceEmitter,string memory traderTypeEmitter,uint tokenAccountIdEmitter)=tradersInterface.getTrader(traderEmitterId);
       // require()
        emit LogInfoEmitter(nameEmitter);
    }
    
    function getAgreement(uint id) public returns(uint,uint, uint, string memory,uint,string memory,string memory) {
        //This is the best way to avoid error stack too deep
        Agreement memory agreement = agreements[id];
        return (
                agreement.traderEmitterId,
                agreement.traderReceiverId,
                agreement.percentage,
                agreement.status, 
                agreement.isrc,
                agreement.traderEmiterName,
                agreement.traderReceiverName);
    }

    event LogInfoEmitter(string);
    event LogTraderCreation(string);
}    
