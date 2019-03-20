pragma solidity ^0.5.0;
import './CalleeTest.sol';

//This is the best way to structure a digital entity in a contract
contract CallerTest{
    CalleeTest public calleeTestInterface;
    
    function getTest2()public{
        calleeTestInterface = new CalleeTest();
        
        calleeTestInterface.setInteger(2);
        uint test2 = calleeTestInterface.getInteger();
        
        calleeTestInterface.setString("MESSAGE INPUT");
        string memory stringTest2=calleeTestInterface.getString();
        
        calleeTestInterface.setStruct(44,"this is a testnet");
        (uint id, string memory name)=calleeTestInterface.getStruct(44);
        
        emit stringLogs('TEST 2');
        //emit intLogs(test2);
        //emit stringLogs(stringTest2);
        emit intLogs(id);
        emit stringLogs(name);
    }

    event stringLogs(string);
    event intLogs(uint);
}    

