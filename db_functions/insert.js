var exports = module.exports = {},
    walletModel = require('../models/wallet');



exports.insertNewWallet = async (wallet) => {
    try {
        let model  = await walletModel.create(wallet);
        return true;
    }
    catch(e) {
        console.log(e);
        throw new Error(e)
    }

};
