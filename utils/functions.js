var exports = module.exports = {},
    Web3 = require('web3'),
    db_insert = require('../db_functions/insert'),
    db_read = require('../db_functions/read'),
    BigNumber = require('bignumber'),
    constants = require('../utils/constant'),
    EthereumTx = require('ethereumjs-tx'),
    axios = require('axios'),
    ethCrypto = require('eth-crypto');

const web3 = new Web3(new Web3.providers.HttpProvider(constants.RINKEBY_CONFIG + constants.RINKEBY_INFURA_KEY));

exports.sendTransaction = async (telegram_id , to_address, amount) =>{
  try {

      let fromAddress = await db_read.ifEthAddressExist(telegram_id);
      let gasPrices = await exports.getCurrentGasPrices();
      let nonce = await exports.getNonceByEthAddress(fromAddress);
      let privateKey = await db_read.getEthPrivateKeyByTelegramId(telegram_id);

      /**
       * Build a new transaction object and sign it locally.
       */
      let rawTransaction = {
          "to": to_address,
          "value": amount * 1000000000000000000,
          "gas": 210000,
          "gasPrice": gasPrices.medium * 1000000000, // converts the gwei price to wei
          "nonce": nonce,
          "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
      };

      console.log(rawTransaction)
    let transactionHash ;
      await  web3.eth.accounts.signTransaction(rawTransaction, privateKey).then(async signed => {
         await web3.eth.sendSignedTransaction(signed.rawTransaction)
              .on('confirmation', (confirmationNumber, receipt) => {
                  if (confirmationNumber == 1) {
                      console.log(receipt)
                  }
              })
              .on('error', (error) => {
                  console.log(error)
              })
              .on('transactionHash',async(hash) => {
                  transactionHash = hash
              });
      });

      return  await transactionHash



  }  catch (e) {

  }
};

exports.checkEthBalance = async (telegram_id) => {
  try {
      let eth_address = await db_read.ifEthAddressExist(telegram_id);
      if(eth_address){
          let balance = await web3.eth.getBalance(eth_address);
          return await web3.utils.fromWei(balance, 'ether');
      }
      return eth_address;

  }  catch (e) {

  }
};



/**
 * Fetch the current transaction gas prices from https://ethgasstation.info/
 *
 * @return {object} Gas prices at different priorities
 */
exports.getCurrentGasPrices = async () => {
    try {
        let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
        let prices = {
            low: response.data.safeLow / 10,
            medium: response.data.average / 10,
            high: response.data.fast / 10
        };

        return prices;
    }catch (e) {

    }

};

/**
 * With every new transaction you send using a specific wallet address,
 * you need to increase a nonce which is tied to the sender wallet.
 */
exports.getNonceByEthAddress = async (eth_address) => {
  try {

      let nonce =await web3.eth.getTransactionCount(eth_address);
      console.log(`The outgoing transaction count for your wallet address is: ${nonce}`);
      return nonce;

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

      await db_insert.insertNewWallet(wallet);

      return wallet.public_address;

  }  catch (e) {
      console.log(e);
      throw new Error(e);
  }
};
