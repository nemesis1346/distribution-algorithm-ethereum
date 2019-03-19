pragma solidity ^0.5.0;
import './CalleTest.sol';

//This is the best way to structure a digital entity in a contract
contract CallerTest{
    CallerTest public calleTestInterface;
    
    function getTest2()public{
        calleTestInterface = new Traders();
        
        calleTestInterfacecalleTestInterface.setInteger(2);
        uint test2 = calleTestInterface.getInteger();
        
        calleTestInterface.setString("MESSAGE INPUT");
        string memory stringTest2=calleTestInterface.getString();
        
        calleTestInterface.setStruct(44,"this is a testnet");
        (uint id, string memory name)=calleTestInterface.getStruct(44);
        
        emit stringLogs('TEST 2');
        //emit intLogs(test2);
        //emit stringLogs(stringTest2);
        emit intLogs(id);
        emit stringLogs(name);
    }

    event stringLogs(string);
    event intLogs(uint);
}    

