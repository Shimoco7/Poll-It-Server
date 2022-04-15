const mongoose = require("mongoose");


const answerSchema = new mongoose.Schema({

    answer: {
        type: String,
        required: [true, "Please enter an answer"]
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    poll_id: {
        type: String,
        required: [true, "Please enter a poll id"]
    },
    poll_question_id: {
        type: String,
        required: [true, "Please enter a poll question id"]
    },
    user_id: {
        type: String,
        required: [true, "Please enter a user id"]
    },

}, {timestamps:true});

module.exports = mongoose.model('Answer', answerSchema);