import { Box, Button, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import styled from 'styled-components'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { askQuestionAction } from '../redux/actions/questionAction'

const AskQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState({});
    const [body, setBody] = useState({});
    const [tags, setTags] = useState({});
    const handleEnter = (e) => {
        if ((e.key) === 'Enter')
            setBody(body + "\n")
    }
    const User = useSelector((state) => state.currentUserReducer)
    const postQuestion = async () => {
        dispatch(askQuestionAction({ questionTitle: title, questionBody: body, questionTags: tags, userPosted: User.user.name ,userId: User.user._id}))
        navigate('/')
    }

    return (
        <AskQuestionWrapper>
            <Box style={{ background: "#F1F2F3", minHeight: "100vh", width: "100%" }}>
                <Container maxWidth="lg">
                    <Typography variant='h5' style={{ paddingTop: "3rem", fontSize: "1.688rem" }}> Ask a public question</Typography>
                    <Box style={{ background: "#fff", padding: '2rem', marginTop: '2rem', borderRadius: "0.18rem", boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 2px 6px 0px, rgba(0, 0, 0, 0.09) 0px 3px 8px 0px" }}>
                        <div>
                            <p style={{ fontSize: "0.938rem", fontWeight: "500" }}>Title</p>
                            <p style={{ fontSize: "0.758rem", color: " #3B4045" }}>Be specific and imagine you’re asking a question to another person</p>
                            <input type="text" className='questionText' name="title" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='questionBody'>
                            <p style={{ fontSize: "0.938rem", fontWeight: "500" }}>Body</p>
                            <p style={{ fontSize: "0.758rem", color: " #3B4045" }}>Include all the information someone would need to answer your question</p>
                            <textarea type="text" className='questionText' name="body" onChange={(e) => setBody(e.target.value)} onKeyPress={handleEnter} />
                        </div>
                        <div>
                            <p style={{ fontSize: "0.938rem", fontWeight: "500" }}>Tags</p>
                            <p style={{ fontSize: "0.758rem", color: " #3B4045" }}>Add up to 5 tags to describe what your question is about</p>
                            <input type="text" className='questionText' name="tags" onChange={(e) => {
                                setTags(e.target.value.split(" "),
                                    console.log(tags))
                            }
                            } />
                        </div>
                        <Button style={{ marginTop: '1.5rem', height: "2.3rem", background: "#0a95ff", boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }} onClick={postQuestion}>Post your question</Button>
                    </Box>
                </Container>
            </Box>
        </AskQuestionWrapper>
    )
}
const AskQuestionWrapper = styled.div`
font-family: 'Open Sans';
input{

    margin-top: 0.2rem; width: 100%; padding: 0.5rem 0.563rem; border-radius: 0.18rem;
    outline: none; border: 1px solid grey;
    &:hover,&:focus,&:active{
    box-shadow: rgba(0, 116, 204, 0.15) 0px 0px 0px 4px;
    border: 0.063rem solid  #59A4DE;}
}
.questionBody{
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

export default AskQuestion