const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstname: String,
    Dob: Date,
    address: String,
    phone_number: String,
    state: String,
    zip_code: Number,
    email: String,
    gender: String,
    user_Type: String,
    user_id: String,

}, {
        timestamps: true
    });
module.exports = mongoose.model('User', UserSchema);