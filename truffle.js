var HDWalletProvider = require('truffle-hdwallet-provider');
//var mnemonic = ''

const path = require("path")
module.exports = {
    //   compilers: {
    //     solc: '0.4.25'
    //   },  
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
      networks: {
        development: {
          host: "127.0.0.1",
          port: 7545,
          network_id: "*" // Match any network id
        }
      /*  ,
      rinkeby: {
        provider: function() {
        return new HDWalletProvider(mnemonic,'');
      },
      network_id: 4
    }*/
      }
    };
