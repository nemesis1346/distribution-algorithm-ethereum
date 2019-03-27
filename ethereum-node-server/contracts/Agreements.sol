pragma solidity ^0.5.0;

contract Traders{
    function getTrader(uint id) public returns(uint, string memory,string memory, string memory,uint){}
}
contract Tracks{
    function getTrack(uint id) public returns(uint, string memory, uint, address){}
}
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
                            uint percentageReceiver, 
                            string memory status, 
                            uint isrc,
                            string memory traderEmiterName,
                            string memory traderReceiverName,
                            address tradersContractAddr,
                            address tracksContractAddr
                            ) public{
      
        percentageReceiver = percentageReceiver/100;
        agreements[id]=Agreement(id,traderEmitterId, traderReceiverId, percentageReceiver, status, isrc,traderEmiterName, traderReceiverName);
        
        require(existTrader(traderEmitterId,tradersContractAddr));
        require(existTrader(traderReceiverId,tradersContractAddr));
        require(existTrack(isrc, tracksContractAddr));
        emit stringLogs("Agreement created!!!"); //this is an event
        //TODO: check the percentage limit 

    }
    
    function existTrack(uint isrc, address tracksContractAddr) public returns (bool){
        Tracks tracksInterface = Tracks(tracksContractAddr);
        (uint isrc, 
        string memory title, 
        uint revenueTotal, 
        address uploaderEOA)=tracksInterface.getTrack(isrc);
        
         if(isrc!=0 && bytes(title).length>0){
            return true; 
        } else{
            return false;
        }  
    }
    
 
    function existTrader(uint traderId,address tradersContractAddr) public returns (bool){
          //We get the Traders contract with address                        
        Traders tradersInterface = Traders(tradersContractAddr);

        (uint idTrader,
        string memory nameTrader, 
        string memory emailTrader, 
        string memory traderTypeTrader,
        uint tokenAccountIdTrader)=tradersInterface.getTrader(traderId);
        
        if(idTrader!=0 && bytes(nameTrader).length>0){
            return true; 
        } else{
            return false;
        }  
    }
    
    function getAgreement(uint id) view public returns(uint,uint, uint, string memory,uint,string memory,string memory) {
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

    event stringLogs(string stringLogs);
    event intLogs(uint intLogs);
}    
