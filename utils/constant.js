var exports = module.exports = {};

exports.API_KEY = 'zsA7Oy4sc1i8wtNkFTg2cWXOxiliYl7ZviGbq3sXbSI';
exports.API_KEY_SECRET = 'JLXVs1eFOTgTgmI7OcbYRflMYiBoIb8exIZjCRWOIHP';
exports.INFURA_KEY = "55397e793412497fb349e0ff77f154f2";
exports.RINKEBY_INFURA_KEY = "e7cc830da9f546b29a0f80a94a2e8cc6";
exports.MAIN_NET_CONFIG = "https://mainnet.infura.io/v3/";
exports.RINKEBY_CONFIG = "https://rinkeby.infura.io/v3/";


exports.currencies = {
    Bitcoin : 'BTC',
    Litecoin : "LTC",
    Ethereum : 'ETH',
    BitcoinCash : 'BCH'
 };

exports.responseMessages = {
    depositNotReceived : "Your deposit wasn't received",
    coinNotAvailable : 'Support for the following coin/token is not available',
    passwordNotMatch: 'Password doesn\'t match - Please Retry',
    dataFetched: 'Success - Data fetched successfully',
    emailNotFound: 'Email not found - Please enter correct one',
    emailAlreadyExists: "Can't register - Email already exists",
    loggedOut: "User , Successfully logged out",
    Success: "Success",
    smsSuccess : "Successfully sent",
    notLoggedIn: "User not logged in"
};
