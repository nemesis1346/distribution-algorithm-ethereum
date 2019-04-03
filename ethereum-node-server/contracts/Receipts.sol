pragma solidity ^0.5.0;

contract Receipts{

    struct Receipt{
        uint id;
        address trackId;
        uint ammount;
        address traderEmitterId;
        address traderReceiverId;
        address agreementId;
        string paymentStatus;
        string datetime;
        address uploaderId;
    }
    mapping(uint=>Receipt) public receiptStructList;
    address[] receiptAddressList;

    function createReceipt(
        uint id,
        address trackId,
        uint ammount,
        address agreementId,
        string memory datetime
       ) public{
        receiptStructList[id].id=id;
        receiptStructList[id].trackId=trackId;
        receiptStructList[id].ammount=ammount;
        receiptStructList[id].agreementId=agreementId;
        receiptStructList[id].datetime=datetime;

        emit stringLogs('Receipt Created!');
        }
        
    function getReceipt(uint id) view public returns(uint, address, uint, address, string memory){
        return(receiptStructList[id].id,
        receiptStructList[id].trackId,
        receiptStructList[id].ammount,
        receiptStructList[id].agreementId,
        receiptStructList[id].datetime);
    }

    event stringLogs(string stringLogs);

}