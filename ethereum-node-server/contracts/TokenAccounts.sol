//Version 2
pragma solidity ^0.5.0;

//This is the best way to structure a digital entity in a contract
contract TokenAccounts{
    
    struct TokenAccount{
        address tokenAccountId;
        uint balanceEnabled;
        uint balanceDisabled;
        address traderEOA;
        bool isTokenAccount;
    }

    mapping(address=>TokenAccount) public tokenAccountStrucList;
    address[] public tokenAccAddrList;
    
    function isTokenAccount(address id) public returns(bool){
        return tokenAccountStrucList[id].isTokenAccount;
    }

    function createTokenAccount(address id) public payable{
        if(isTokenAccount(id)) revert('Token account already exist');
        address traderEOA = msg.sender; 
        tokenAccountStrucList[id].tokenAccountId=id;
        tokenAccountStrucList[id].balanceEnabled=0;
        tokenAccountStrucList[id].balanceDisabled=0;
        tokenAccountStrucList[id].traderEOA = traderEOA;
        tokenAccountStrucList[id].isTokenAccount=true;

        tokenAccAddrList.push(id);
        
        emit stringLogs("Tokent Account created!!!"); //this is an event 
    }
    
    function getTokenAccount(address tokenAccountId) view public returns(address, uint, uint, address) {
        return (tokenAccountStrucList[tokenAccountId].tokenAccountId, 
        tokenAccountStrucList[tokenAccountId].balanceEnabled, 
        tokenAccountStrucList[tokenAccountId].balanceDisabled, 
        tokenAccountStrucList[tokenAccountId].traderEOA);
    }
    function addEnabledBalance(address tokenAccountId, uint value)public returns(bool){
        tokenAccountStrucList[tokenAccountId].balanceEnabled+=value;
        return true;
    }
    function addDisabledBalance(address tokenAccountId, uint value) public returns(bool){
        tokenAccountStrucList[tokenAccountId].balanceDisabled+= value;
        return true;
    }
    event stringLogs(string stringLogs);

}    
