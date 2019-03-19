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
    CalleeTest public calleTestInterface;
    
    function getTest2(address calleAddress)public{
        calleTestInterface = CalleeTest(calleAddress); //this CREATES A NEW EMPTY CONTRACT INSTANCE
        
        calleTestInterface.setInteger(2);
        uint test2 = calleTestInterface.getInteger();
        
        calleTestInterface.setString("MESSAGE INPUT");
        string memory stringTest2=calleTestInterface.getString();
        
        calleTestInterface.setStruct(44,"this is a testnet");
        (uint id, string memory name)=calleTestInterface.getStruct(11);
        
        emit stringLogs('TEST 2');
        //emit intLogs(test2);
        //emit stringLogs(stringTest2);
        emit intLogs(id);
        emit stringLogs(name);
    }

    event stringLogs(string);
    event intLogs(uint);
}    

