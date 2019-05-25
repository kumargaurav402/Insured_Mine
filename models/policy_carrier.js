const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Policy_carrierSchema = new Schema({
    company_name: String,
    user_id: String,
}, {
        timestamps: true
    });
module.exports = mongoose.model('policy_carrier', Policy_carrierSchema);