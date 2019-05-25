const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Policy_CategorySchema = new Schema({
    category_name: String,
    user_id: String,

}, {
        timestamps: true
    });
module.exports = mongoose.model('Policy_Category', Policy_CategorySchema);