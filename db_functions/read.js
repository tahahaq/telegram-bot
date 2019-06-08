var exports = module.exports = {},
    walletModel = require('../models/wallet');



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

exports.getTransactionByAddress = async (address) => {
    try {
        return await transactionModel.find({publicAddress: address});
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.getUnconfirmedTransactions = async () => {
    try {
        return await transactionModel.find({isFinished: false});
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.getAllCandidates = async () => {
    try {
        return await candidateModel.find({});
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.getElectionStatus = async () => {
    try {
        return await ElectionModel.find({});
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};


exports.getAllVoters = async () => {
    try {
        return await voterModel.find({});
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};


// USER-LOGIN FUNCTIONS

exports.authenticateUser = async (user) => {
    if (user.isVoter === true) {
        return await exports.authenticateVoter(user);
    } else if (user.isCandidate === true) {
        return await exports.authenticateCandidate(user)
    }
};

exports.authenticateVoter = async (user) => {
    try {
        let dbUser = await voterModel.find({studentId: user.studentId});
        if (constants.isEmpty(dbUser)) {
            throw new Error(constants.responseMessages.emailNotFound)
        }
        let match = await bcrypt.compare(user.password, dbUser[0].password);
        if (!match) {
            throw new Error(constants.responseMessages.passwordNotMatch);
        }

        let token = jwt.sign({id: dbUser[0]._id}, constants.secret, {
            expiresIn: 84600
        });

        let returningUser = dbUser[0].toObject();
        delete returningUser.password;

        return {auth: true, token: token, user: returningUser}

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.authenticateCandidate = async (user) => {
    try {
        let dbUser = await candidateModel.find({studentId: user.studentId});
        if (constants.isEmpty(dbUser)) {
            throw new Error(constants.responseMessages.emailNotFound)
        }
        let match = await bcrypt.compare(user.password, dbUser[0].password);
        if (!match) {
            throw new Error(constants.responseMessages.passwordNotMatch);
        }

        let token = jwt.sign({id: dbUser[0]._id}, constants.secret, {
            expiresIn: 84600
        });

        let returningUser = dbUser[0].toObject();
        delete returningUser.password;

        return {auth: true, token: token, user: returningUser}

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
