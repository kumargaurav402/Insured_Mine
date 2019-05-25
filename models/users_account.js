const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_AccountSchema = new Schema({
    account_name: String,
    user_id: String,

}, {
        timestamps: true
    });
module.exports = mongoose.model('User_Account', User_AccountSchema);