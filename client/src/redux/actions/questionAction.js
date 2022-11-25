import axios from 'axios';
export const askQuestionAction = (questionData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API}askquestion`, questionData, )
        dispatch({
            type: "ASK_QUESTION",
            payload: data
        })
        dispatch(getAllQuestionAction())
    } catch (error) {
        dispatch({
            type: "ASK_QUESTION",
            payload: { message: "Something went wrong" }
        })
    }
}
export const getAllQuestionAction = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}getquestion`)
        var hours = 0.5; // to clear the localStorage after 1 hour
        // (if someone want to clear after 8hrs simply change hours=8)
        var now = new Date().getTime();
        var setupTime = localStorage.getItem('setupTime');
        if (setupTime == null) {
            localStorage.setItem('setupTime', now)
        } else {
            if (now - setupTime > hours * 60 * 60 * 1000) {
                localStorage.clear()
            }
        }
        dispatch({
            type: "GET_ALL_QUESTION",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "GET_ALL_QUESTION",
            payload: { message: "Something went wrong" }
        })
    }
}

export const postAnswer = (answerData) => async (dispatch) => {
    try {
        const { id, userId, noOfAnswer, answerBody, userAnswer } = answerData
        const { data } = await axios.patch(`${process.env.REACT_APP_API}postanswer/${id}`, { userId, noOfAnswer, answerBody, userAnswer }, )
        dispatch({
            type: "POST_ANSWER",
            payload: data
        })
        dispatch(getAllQuestionAction());
    } catch (error) {
        console.log(error);
    }

}

export const deleteQuestionAction = (id) => async (dispatch) => {

    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API}deletequestion/${id}`, )
        dispatch(getAllQuestionAction());
    } catch (error) {
        console.log(error);
    }

}

export const deleteAnswerAction = (id, answerId, noOfAnswer) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`${process.env.REACT_APP_API}deleteanswer/${id}`, { id, answerId, noOfAnswer }, )
        dispatch(getAllQuestionAction());
    } catch (error) {
        console.log(error);
    }
}

export const voteQuestionAction = (id, value, userId) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`${process.env.REACT_APP_API}vote/${id}`, { value, userId }, )
        dispatch(getAllQuestionAction())
    } catch (error) {
        console.log(error);



    }
}