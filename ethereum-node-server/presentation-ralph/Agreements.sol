pragma solidity ^0.5.0;

contract Traders{
    function isTrader(address id) public returns(bool){}
    function getTrader(address id) view public returns(address, string memory){}
}
contract DigitalAssets{
    function isAsset(address id)public returns(bool){}
    function getAsset(address id) view public returns(address,string memory){}
}
contract Agreements{
    struct Agreement{
        address id;
        address emitter;
        address receiver;
        address asset;
        uint perentageShare;
        bool isAgreement;
    }
    mapping(address=>Agreement) public agreementStructList;
    address[] public agreementAddressList;
    
    function isAgreement(address id)public returns(bool){
        return agreementStructList[id].isAgreement;
    }
    function createAgreement(address id, address emitter,address receiver,address asset, uint percentage,address tradersCtr,address digitalAssetCtr) public{

        DigitalAssets digitalAssetInterface= DigitalAssets(digitalAssetCtr);
        Traders traderCtr = Traders(tradersCtr);
        
        if(isAgreement(id)) revert("agreement exists");
        if(!digitalAssetInterface.isAsset(asset)) revert("asset doesnt exist");
        if(!traderCtr.isTrader(receiver)) revert("receiver doesnt exist");
        if(!traderCtr.isTrader(emitter)) revert("emiter doesnt exist");
        
        agreementStructList[id].id= id;
        agreementStructList[id].emitter= emitter;
        agreementStructList[id].receiver = receiver;
        agreementStructList[id].asset = asset;
        agreementStructList[id].perentageShare =percentage;
        
        emit stringLogs('Agreement created');
    }
        event stringLogs(string);

}