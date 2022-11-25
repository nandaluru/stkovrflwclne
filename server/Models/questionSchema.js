import mongoose from 'mongoose'
const { Schema } = mongoose;

const questionSchema = Schema({
    questionTitle: { type: String, required: "Question must have a title" },
    questionBody: { type: String, required: "Question must have a body" },
    questionTags: { type: [String], required: "Question must have a tags" },
    noOfAnswer: { type: Number, default: 0 },
    downVote: { type: [String], default: [] },
    upVote: { type: [String], default: [] },
    userPosted: { type: String, required: " Question must have an author" },
    userId: { type: String },
    postedOn: { type: Date, default: Date.now },
    answer: [{
        answerBody: String,
        userAnswer: String, userId: String, answeredOn: { type: Date, default: Date.now }
    }]

})

export default mongoose.model('Question ', questionSchema)