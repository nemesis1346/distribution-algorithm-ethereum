pragma solidity ^0.5.0;

contract Traders{
    function getTrader(address id) public returns(uint, string memory,string memory, string memory,uint){}
    function isTrader(address id) public returns(bool){}
}
contract Tracks{
    function getTrack(address id) public returns(uint, string memory, uint, address){}
    function isTrack(address id) public returns(bool){}
}

//This is the best way to structure a digital entity in a contract
contract Agreements{
    struct Agreement{
        address id;
        address traderEmitterId;
        address traderReceiverId;
        uint percentage;
        address trackId;
        bool isAgreement;
    }
    struct AgreementByEmitter{
        address emitter;
        address[] agreements;
    }
    mapping(address=>Agreement) public agreementStructList;
    mapping(address=> AgreementByEmitter) agreementsByEmitter; //query
    address[] public agreementAddrList;

    function isAgreement(address id) public returns(bool){
        return agreementStructList[id].isAgreement;
    }
    function createAgreement(address id, 
                            address traderEmitterId, 
                            address traderReceiverId, 
                            uint percentageReceiver, 
                            address trackId,
                            address tradersContractAddr,
                            address tracksContractAddr
                            ) public{
        if(isAgreement(id)) revert("Agreement already exists");

        //This is just some testing
        agreementsByEmitter[traderEmitterId].emitter=traderEmitterId;
        agreementsByEmitter[traderEmitterId].agreements.push(id);//This is for query the agreement by receiver
       
        percentageReceiver = percentageReceiver/100;
        
        Traders tradersContract= Traders(tradersContractAddr);
        Tracks tracksContract = Tracks(tracksContractAddr);

        if(!tradersContract.isTrader(traderEmitterId)) revert('Emitter doesnt exists');
        if(!tradersContract.isTrader(traderReceiverId)) revert('Receiver doesnt exists');
        if(!tracksContract.isTrack(trackId)) revert('Track doenst exists');
        //TODO: There should be some validation of the existence of duplication of emitter and receiver

        agreementStructList[id].id= id;
        agreementStructList[id].traderEmitterId=traderEmitterId;
        agreementStructList[id].traderReceiverId=traderReceiverId;
        agreementStructList[id].percentage=percentageReceiver;
        agreementStructList[id].trackId = trackId;
        agreementStructList[id].isAgreement=true;
        
        agreementAddrList.push(id);

        emit stringLogs("Agreement created!!!"); //this is an event
        //TODO: check the percentage limit 

    }
      function getAgreementsByEmitter(address emitterId) view public returns(address[] memory){
        return agreementsByEmitter[emitterId].agreements;
    }

    function getAgreement(address id) view public returns(address,address, address, uint,address) {
        //This is the best way to avoid error stack too deep
        return (
                agreementStructList[id].id,
                agreementStructList[id].traderEmitterId,
                agreementStructList[id].traderReceiverId,
                agreementStructList[id].percentage,
                agreementStructList[id].trackId);
    }
    event stringLogs(string stringLogs);
    event intLogs(uint intLogs);
}    
