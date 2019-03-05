const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/MetaCoin.json');
const track_artifact = require('../build/contracts/Tracks.json');

const Track = contract(track_artifact);
const MetaCoin = contract(metacoin_artifact);

const Web3 = require('web3');

module.exports = {
  start: function (callback) {
    var self = this;//? where does this come from?

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
  },
  refreshBalance: function (account, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function (instance) {
      meta = instance;
      return meta.getBalance.call(account, { from: account });
    }).then(function (value) {
      callback(value.valueOf());
    }).catch(function (e) {
      console.log(e);
      callback("Error 404");
    });
  },
  sendCoin: function (amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function (instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, { from: sender });
    }).then(function () {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  addTrack: function () {
    console.log('PROVIDER');
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;

    const web3Provider = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //console.log(web3Provider);
    // Bootstrap the MetaCoin abstraction for Use.
    Track.setProvider(web3Provider.currentProvider);
  
    console.log('PASSED');
    Track.deployed().then(function (instance) {
      meta = instance;
      console.log(meta);
    }).catch(function (e) {
      console.log(e);
    });
  }
}
