var exports = module.exports = {},
    walletModel = require('../models/wallet');



exports.getEthPrivateKeyByTelegramId = async  (telegram_id) => {
    try {
        let user = await walletModel.findOne({telegram_id});
        if(user) {
            return user.private_key;
        }
        return false;
    }catch (e) {

    }
}


exports.ifEthAddressExist = async (telegram_id) => {
    try {
         let user =  await walletModel.findOne({telegram_id});
        if(user) {
            return user.public_address;
        }
        return false;
    }catch (e) {

    }
}

