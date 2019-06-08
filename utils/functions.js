var exports = module.exports = {},
    Web3 = require('web3'),
    db_insert = require('../db_functions/insert'),
    db_read = require('../db_functions/read'),
    BigNumber = require('bignumber'),
    constants = require('../utils/constant'),
    ethCrypto = require('eth-crypto');

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + constants.INFURA_KEY));

exports.checkEthBalance = async (telegram_id) => {
  try {
      let eth_address = await db_read.ifEthAddressExist(telegram_id);
      if(eth_address){
          // let  balance = await web3.eth.getBalance(eth_address); //Will give value in.
          // balance = await web3.utils.toDecimal(balance);
          // console.log(balance);

          let balance = await web3.eth.getBalance(eth_address);
          let etherBalance = await web3.utils.fromWei(balance  , 'ether');
          console.log(etherBalance)

          return etherBalance;
      }
      return eth_address;

  }  catch (e) {

  }
};

exports.generateETHAddress = async (telegram_id) => {
  try {

      let ifEthExist = await db_read.ifEthAddressExist(telegram_id);
      if(ifEthExist){
          return ifEthExist;
      }
      const identity = ethCrypto.createIdentity();

      let wallet = {
          symbol: 'ETH',
          public_key : identity.publicKey,
          private_key: identity.privateKey,
          public_address: identity.address,
          telegram_id
      };

      await db_insert.insertNewWallet(wallet)

      return wallet.public_address;

  }  catch (e) {
      console.log(e);
      throw new Error(e);
  }
};
