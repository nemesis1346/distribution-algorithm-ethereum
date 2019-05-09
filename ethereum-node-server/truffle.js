// Allows us to use ES6 in our migrations and tests.
require('babel-register');
require('dotenv').config();
const HDWalletProvider=require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    },
    ropsten:{
      provider:function(){
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://ropsten.infura.io/${process.env.INFURA_API_KEY}"
          );
      },
      gasPrice:25000000000,
      network_id:3
    }
  },
  solc:{
    optimizer:{
      enabled:true,
      runs:200
    }
  }
}
