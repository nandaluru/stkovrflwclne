import Question from '../Models/questionSchema.js'
import mongoose from 'mongoose';
export const askquestion = async (req, res) => {

    try {
        const postQuestionData = req.body;
        const postQuestion = new Question({ ...postQuestionData, userId: req.body.userId })
        await postQuestion.save();
        return res.status(200).json({ message: "Question posted successfully." })
    } catch (error) {
        console.log(error);
        return res.status(409).json({ message: "Couldn't post a new question" })
    }
}

export const getquestion = async (req, res) => {

    try {
        const allquestion = await Question.find();
        return res.status(200).json(allquestion)
    } catch (error) {
        console.log(error);
        return res.status(409).json({ message: "Couldn't post a new question" })
    }
}

export const deletequestion = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: "question cannot be delete" });
        await Question.findByIdAndDelete(id);
        return res.status(200).json({ message: "Question deleted successfully" })
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Something went wrong" });

    }
}

export const votequestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { value, userId } = req.body
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: "question cannot be voted" });
        try {
            const question = await Question.findById(id)
            const upIndex = question.upVote.findIndex(id => id === String(userId))
            const downIndex = question.downVote.findIndex(id => id === String(userId))

            if (value === 'upvote') {
                if (downIndex !== -1) {
                    question.downVote = question.downVote.filter((id) => id !== String(userId))
                }
                if (upIndex === -1) {
                    question.upVote.push(userId)
                }
                else {
                    question.upVote = question.upVote.filter((id) => id !== String(userId))
                }
            }
            if (value === 'downvote') {
                if (upIndex !== -1) {
                    question.upVote = question.upVote.filter((id) => id !== String(userId))
                }
                if (downIndex === -1) {
                    question.downVote.push(userId)
                }
                else {
                    question.downVote = question.downVote.filter((id) => id !== String(userId))
                }
            }
            await Question.findByIdAndUpdate(id, question)
            
            return res.status(200).json({ message: "Voted Succesfully" })
        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: "Something went wrong" })

        }


    } catch (error) {
        console.log(error);

    }
}