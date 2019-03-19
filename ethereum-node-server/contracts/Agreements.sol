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
        
       // require(existEmitter(traderEmitterId));
        existEmitter(traderEmitterId);
       // emit intLogs(commision);
        emit stringLogs("Agreement created!!!"); //this is an event 

    }
    function existEmitter(uint traderEmitterId) public payable{
          //We get the other traders                        
        Traders tradersInterface = new Traders();
        //emit commonLogs("IS HERE!!!"); //this is an event 

        uint commission = msg.value; //this is the commission to access another contract
        //emit intLogs(commission);
       //(uint idEmitter,string memory nameEmitter, string memory emailEmitter, uint balanceEmitter,string memory traderTypeEmitter,uint tokenAccountIdEmitter)=tradersInterface.getTrader.value(commission)(traderEmitterId);
       (uint idEmitter,string memory nameEmitter, string memory emailEmitter, uint balanceEmitter,string memory traderTypeEmitter,uint tokenAccountIdEmitter)=tradersInterface.getTrader(1);

       // require()
        //emit intLogs(idEmitter);
        emit stringLogs(nameEmitter);
        emit stringLogs(emailEmitter);
        string memory test = tradersInterface.test("this is a test");
        emit stringLogs(test);
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

    event stringLogs(string);
    event intLogs(uint);
}    
