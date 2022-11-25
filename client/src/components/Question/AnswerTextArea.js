import { Button } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { postAnswer } from '../../redux/actions/questionAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AnswerTextArea = ({ que }) => {
    const navigate = useNavigate();
    var User = useSelector(state => state.currentUserReducer)
    const dispatch = useDispatch();
    const [ans, setAns] = useState("")
    const handleAnswer = () => {
        if (User === null) {
            window.alert("Login to answer the question");
            return;
        }
        if (ans === "") {
            window.alert("Enter the answer before submitting    ");
        } else {
            dispatch(postAnswer({ id: que._id, userId: que.userId, noOfAnswer: que.answer.length + 1, answerBody: ans, userAnswer: User.user.name }))
            setAns('')
        }
    }
    return (
        <AnswerTextAreaWrapper>
            <div className='answerBody'>
                <p style={{ fontSize: "1.238rem", fontWeight: "500" }}>Your Answer</p>
                <textarea type="text" className='questionText' onChange={(e) => setAns(e.target.value)} value={ans} />
            </div>
            <Button onClick={handleAnswer} style={{ marginTop: '1.5rem', height: "2.3rem", background: "#0a95ff", boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }}>Post Your Answer</Button>
        </AnswerTextAreaWrapper>
    )
}

const AnswerTextAreaWrapper = styled.div`
padding: 2rem;
.answerBody{
    margin-top: 1.2rem;
    textarea{
        resize: none;
        margin-top: 1rem;
        width:100%;
        min-height: 14rem;
        &:hover,&:focus,&:active{
    box-shadow: rgba(0, 116, 204, 0.15) 0px 0px 0px 4px;
    outline: none;
    border: 0.063rem solid  #59A4DE;}
    }
}
`
export default AnswerTextArea