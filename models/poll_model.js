const mongoose = require("mongoose");


const pollSchema = new mongoose.Schema({

    poll_name: {
        type: String,
        required: [true, "Please enter a poll name"]
    }

}, {timestamps:true});

module.exports = mongoose.model('Poll', pollSchema);