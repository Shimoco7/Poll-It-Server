const mongoose = require("mongoose");


const QuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: [true, "Please enter a question"]
    },
    multi_choice: {
        type: [String]
    }

}, {timestamps:true});

module.exports = mongoose.model('Question', QuestionSchema);