const mongoose = require("mongoose");


const pollSchema = new mongoose.Schema({

    poll_name: {
        type: String,
        unique: true
    }

}, {timestamps:true});

module.exports = mongoose.model('Poll', pollSchema);