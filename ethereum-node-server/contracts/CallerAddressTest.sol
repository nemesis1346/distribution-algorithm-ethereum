pragma solidity ^0.5.0;
//This is the correct way to do it, its working 
contract CalleeTest{
    function getString() public returns(string memory){}
    function setString(string memory stringInput)public returns(string memory){}
    function getInteger() public returns(uint){}
    function setInteger(uint id) public returns(uint){}
    function getStruct(uint id) public payable returns(uint, string memory){}
    function setStruct(uint id, string memory name) public{}
}

//This is the best way to structure a digital entity in a contract
contract CallerAddressTest{
    CalleeTest public calleeTestInterface;
    
    //This is a test for query by other property
    struct AgreementTest{
        uint agreementId;
        uint emitterId;
        uint receiverId;
    }
    mapping(uint=>AgreementTest) public agreements;
    mapping(uint=> uint) getAgreementIdByReceiver;


    function createTraderTest(uint agreementId, uint emitterId, uint receiverId) public {
        getAgreementIdByReceiver[receiverId]=agreementId;
        agreements[agreementId]=AgreementTest(agreementId,emitterId,receiverId);
    }
    function getAgreementByReceiver(uint receiverId) public returns(uint){
        return getAgreementIdByReceiver[receiverId];
    }
    
    function getTest2(address calleAddress)public{
        calleeTestInterface = CalleeTest(calleAddress); //this CREATES A NEW EMPTY CONTRACT INSTANCE
        
        calleeTestInterface.setInteger(2);
        uint test2 = calleeTestInterface.getInteger();
        
        calleeTestInterface.setString("MESSAGE INPUT");
        string memory stringTest2=calleeTestInterface.getString();
        
        calleeTestInterface.setStruct(44,"this is a testnet");
        (uint id, string memory name)=calleeTestInterface.getStruct(11);
        
        emit stringLogs('TEST 2');
        //emit intLogs(test2);
        //emit stringLogs(stringTest2);
        emit intLogs(id);
        emit stringLogs(name);
    }

    event stringLogs(string stringLogs);
    event intLogs(uint intLogs);
}    

