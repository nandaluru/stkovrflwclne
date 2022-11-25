import Question from "../Models/questionSchema.js"
import mongoose from "mongoose";

export const postanswer = async (req, res) => {
    const { id } = req.params
    const { noOfAnswer, answerBody, userAnswer, userId } = req.body;
    console.log(req.body);
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('Question not found');

    updateNoOfQuestion(id, noOfAnswer)
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, { $addToSet: { 'answer': [{ answerBody, userAnswer, userId: userId }] } })
        return res.status(200).json(updatedQuestion)
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" })
    }
}

const updateNoOfQuestion = async (id, noOfAnswer) => {
    try {
        await Question.findByIdAndUpdate(id, { $set: { 'noOfAnswer': noOfAnswer } })
    } catch (error) {
        console.log(error);
    }
}

export const deleteanswer = async (req, res) => {
    try {

        const { id, answerId, noOfAnswer } = req.body
        console.log(req.body);
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: "Question not found" })
        if (!mongoose.Types.ObjectId.isValid(answerId))
            return res.status(404).json({ message: "Answer cannot be deleted" })
        updateNoOfQuestion(id, noOfAnswer);

        try {
            await Question.updateOne({ _id: id }, { $pull: { 'answer': { _id: answerId } } })
            return res.status(200).json({ message: "Answer deleted succesfully" })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Something went wrong" })

        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something went wrong" })

    }
}