
pragma solidity ^0.5.0;

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