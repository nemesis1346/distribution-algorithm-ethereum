var Track = artifacts.require('./Tracks.sol');
var Agreements = artifacts.require('./Agreements.sol');
var TokenAccounts = artifacts.require('./TokenAccounts.sol');
var Tracks = artifacts.require('./Tracks.sol');
var Traders = artifacts.require('./Traders.sol');
var CalleeAddressTest = artifacts.require('./best-practices/CallerAddressTest.sol');
var CalleeTest=artifacts.require('./best-practices/CalleeTest.sol');
var CallerTest = artifacts.require('./best-practices/CallerTest.sol');
var Receipts=artifacts.require('./Receipts.sol');
var Distribution =artifacts.require('./Distribution');

module.exports = function(deployer) {
  deployer.deploy(Track);
  deployer.deploy(Agreements);
  deployer.deploy(TokenAccounts);
  deployer.deploy(Tracks);
  deployer.deploy(Traders);
  // deployer.deploy(CalleeAddressTest);
  // deployer.deploy(CalleeTest);
  // deployer.deploy(CallerTest);
  deployer.deploy(Receipts);
  deployer.deploy(Distribution);
};
