const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Policy_InfoSchema = new Schema({

    policy_number: String,
    policy_start_date: Date,
    policy_end_date: Date,
    policy_category_collection_id: String,
    company_collection_id: String,
    user_id: String,
    email: String,
    gender: String,
    user_Type: String,
    user_id: {
        type: String,
        unique: true,
    }


}, {
        timestamps: true
    });
module.exports = mongoose.model('Policy_Info', Policy_InfoSchema);