var mongoose = require("mongoose");

walletSchema = new mongoose.Schema({
    private_key : String,
    public_key : String,
    telegram_id : String,
    public_address : String,
    symbol : String
});

//MODEL
module.exports = mongoose.model("walletSchema", walletSchema);
