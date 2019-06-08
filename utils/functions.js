var exports = module.exports = {},
    db_insert = require('../db_functions/insert'),
    db_read = require('../db_functions/read'),
    ethCrypto = require('eth-crypto');

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
