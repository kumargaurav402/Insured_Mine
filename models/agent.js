const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AgentSchema = new Schema({

    Agent_Name: String,
    user_id: {
        type: String,
    }
}, {
        timestamps: true
    });
module.exports = mongoose.model('Agent', AgentSchema);