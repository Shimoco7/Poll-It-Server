const mongoose = require("mongoose");


const detailSchema = new mongoose.Schema({

    answer: {
        type: String,
        required: [true, "Please enter an answer"]
    },
    question: {
        type: String,
        required: [true, "Please enter a question"]
    },
    question_id: {
        type: String,
        required: [true, "Please enter a question id"]
    },
    uid: {
        type: String,
        required: [true, "Please enter a uid"]
    }

}, {timestamps:true});

module.exports = mongoose.model('Detail', detailSchema);