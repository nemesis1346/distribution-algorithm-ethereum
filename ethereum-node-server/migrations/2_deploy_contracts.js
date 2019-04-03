var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Track = artifacts.require('./Tracks.sol');
var Agreements = artifacts.require('./Agreements.sol');
var TokenAccounts = artifacts.require('./TokenAccounts.sol');
var Tracks = artifacts.require('./Tracks.sol');
var Traders = artifacts.require('./Traders.sol');
var CalleeAddressTest = artifacts.require('./CallerAddressTest.sol');
var CalleeTest=artifacts.require('./CalleeTest.sol');
var CallerTest = artifacts.require('./CallerTest.sol');
var Receipts=artifacts.require('./Receipts.sol');
var Distribution =artifacts.require('./Distribution');

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  deployer.deploy(Track);
  deployer.deploy(Agreements);
  deployer.deploy(TokenAccounts);
  deployer.deploy(Tracks);
  deployer.deploy(Traders);
  deployer.deploy(CalleeAddressTest);
  deployer.deploy(CalleeTest);
  deployer.deploy(CallerTest);
  deployer.deploy(Receipts);
  deployer.deploy(Distribution);
};
