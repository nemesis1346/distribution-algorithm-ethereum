pragma solidity ^0.5.0;

contract Traders{
    struct Trader{
        address id;
        string name;
        bool isTrader;
    }

    mapping(address=>Trader) public traderStructList;
    address[] public traderAddressList;
    
     function isTrader(address id) public view returns(bool){
        return traderStructList[id].isTrader;
    }

    function createTrader(address id, string memory name) public{
        if(isTrader(id)) revert("trader already exists");

       traderStructList[id].id = id;
       traderStructList[id].name = name;
        traderStructList[id].isTrader =true;
        
        traderAddressList.push(id);
        
        emit stringLogs("Trader Was Created");
    }
    
     function getTraderCount() public view returns(uint count) {
        return traderAddressList.length;
    }
    
    function getTrader(address id) view public returns(address, string memory) {
        return (traderStructList[id].id, 
        traderStructList[id].name);
    }


    event stringLogs(string logs);
}    

contract DigitalAssets{
    
    struct Asset{
        address id;
        string name; // Title track
        bool isTrack;
    }
    mapping(address=>Asset) public assetStructList;
    address[] public assetAddressList;
    
    function isAsset(address id) public returns(bool){
        return assetStructList[id].isTrack;
    }
    
    function createTrack(address id, string memory name) public{
        if(isAsset(id)) revert("Track already exists");
        
        assetStructList[id].id=id;
        assetStructList[id].name=name;
        assetStructList[id].isTrack=true;
        
        assetAddressList.push(id);
        
        emit stringLogs('Digital Asset created');
        
    }
    function getAssetCount() public returns(uint){
        return assetAddressList.length;
    }
    
    function getAsset(address id) view public returns(address, string memory){
        return(assetStructList[id].id, assetStructList[id].name);
    }
    event stringLogs(string logs);

}

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

        DigitalAssets digitalAssetCtr= DigitalAssets(digitalAssetCtr);
        Traders traderCtr = Traders(tradersCtr);
        
        if(isAgreement(id)) revert("agreement exists");
        if(!digitalAssetCtr.isAsset(asset)) revert("asset doesnt exist");
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