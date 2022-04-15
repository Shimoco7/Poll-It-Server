const mongoose = require("mongoose");


const pollQuestionSchema = new mongoose.Schema({

    poll_question: {
        type: String,
        required: [true, "Please enter a poll question name"]
    },
    poll_question_type: {
        type: String,
        enum: {values:["Multi Choice", "Image"], message: "Please enter a valid poll question type"}
    },
    choices: {
        type: [String]
    },
    poll_id:{
        type: String 
    }

}, {timestamps:true});

module.exports = mongoose.model('PollQuestion', pollQuestionSchema, "polls_questions");