pragma solidity ^0.5.0;

//This is the best way to structure a digital entity in a contract
contract CalleeTest{
    uint public integerTest=0;
    string public anotherMessage ="HOLA";
    
    struct StructTest{
        uint id;
        string name;
    }

    mapping(uint=>StructTest) public structs;

    function getString() public returns(string memory){
        return (anotherMessage);
    }
    function setString(string memory stringInput)public returns(string memory){
        anotherMessage = stringInput;
    }
    function getInteger() public returns(uint){
        return integerTest;
    }
    function setInteger(uint id) public returns(uint){
        integerTest= id;
        return integerTest;
    }
     function getStruct(uint id) public payable returns(uint, string memory) {
        return (structs[id].id, structs[id].name);
    }
    function setStruct(uint id, string memory name) public{
        structs[id]=StructTest(id,name);
    }

    event stringLogs(string);
    event intLogs(uint);
}    
