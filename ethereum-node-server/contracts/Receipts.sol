pragma solidity ^0.5.0;

contract Receipts{

    struct Receipt{
        address id;
        address trackId;
        uint ammount;
        address traderEmitterId;
        address traderReceiverId;
        address agreementId;
        string paymentStatus;
        string datetime;
        address uploaderId;
        uint percentageReceiver;
    }
    mapping(address=>Receipt) public receiptStructList;
    address[] receiptAddressList;

    function createReceipt(
        address id,
        address trackId,
        uint ammount,
        address traderEmitterId,
        address traderReceiverId,
        address agreementId,
        string memory paymentStatus,
        string memory datetime,
        address uploaderId,
        uint percentageReceiver ) public{
        receiptStructList[id].id=id;
        receiptStructList[id].trackId=trackId;
        receiptStructList[id].ammount=ammount;
        receiptStructList[id].traderEmitterId=traderEmitterId;
        receiptStructList[id].traderReceiverId=traderReceiverId;
        receiptStructList[id].agreementId=agreementId;
        receiptStructList[id].paymentStatus=paymentStatus;
        receiptStructList[id].datetime=datetime;
        receiptStructList[id].uploaderId=uploaderId;
        receiptStructList[id].percentageReceiver=percentageReceiver;

        emit stringLogs('Receipt Created!');
        }
    function getReceipt(address id) view public returns(address, address, uint, address, address, address, string memory, string memory, address, uint){
        return(receiptStructList[id].id,
        receiptStructList[id].trackId,
        receiptStructList[id].ammount,
        receiptStructList[id].traderEmitterId,
        receiptStructList[id].traderReceiverId,
        receiptStructList[id].agreementId,
        receiptStructList[id].paymentStatus,
        receiptStructList[id].datetime,
        receiptStructList[id].uploaderId,
        receiptStructList[id].percentageReceiver);
    }

    event stringLogs(string stringLogs);

}