import React, { useEffect } from 'react'
import styled from 'styled-components'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Answer from './Answer';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import copy from 'copy-to-clipboard';
import AnswerTextArea from './AnswerTextArea'
import { deleteQuestionAction, getAllQuestionAction, voteQuestionAction } from '../../redux/actions/questionAction';


const QuestionDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllQuestionAction())
    }, [dispatch])
    const url = window.location.href
    const handleShare = () => {
        copy(url)
        window.alert("URL copied to clipboard")
    }
    const handleDelete = (id) => {
        dispatch(deleteQuestionAction(id));
        navigate('/')
    }
    const { id } = useParams()
    const questionData = useSelector(state => state.questionReducer)
    var User = useSelector(state => state?.currentUserReducer)
    const handleUpVote = () => {
        dispatch(voteQuestionAction(id, 'upvote', User?.user._id));
    }
    const handleDownVote = () => {
        dispatch(voteQuestionAction(id, 'downvote', User?.user._id));
    }
    return (
        <>
            {(questionData.data === null) ? <p>Loading...</p> : <>
                <QuestionDetailsWrapper>
                    {questionData.data.filter(que => (que._id == id)).map(que => (
                        <div key={que._id}>
                            <div style={{ marginBottom: "1rem" }} >
                                <div>
                                    <h3>{que.questionTitle} </h3>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className='questionDetails' ><ArrowDropUpIcon onClick={handleUpVote} style={{ cursor: 'pointer' }} /><span>{que.upVote.length - que.downVote.length}</span><ArrowDropDownIcon onClick={handleDownVote} style={{ cursor: 'pointer' }} /></div>
                                    <div className="questionMainBody" style={{ flex: 1, position: 'relative' }}>
                                        <p style={{ marginTop: "1.1rem", fontSize: "0.89rem" }}> {que.questionBody}</p>
                                        {
                                            que.questionTags.map((tag, index) => <span key={index}>{tag}</span>)}<div style={{ position: 'relative', bottom: 0 }}>
                                            <button className='deleteShare' onClick={handleShare} >Share</button>
                                            {User?.user?._id === que?.userId && <button onClick={() => handleDelete(que._id)} className='deleteShare'>Delete</button>}</div>
                                        <div style={{ position: 'absolute', right: 0, bottom: 0, }}>

                                            <p style={{ fontWeight: "500", fontSize: "0.813rem" }}>{moment(que.postedOn).fromNow()}</p>
                                            <p style={{ fontWeight: "500", fontSize: "0.813rem", display: 'flex', alignItems: "center" }}> <span className="initials">{que.userPosted[0]}</span>{que.userPosted}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Answer answerData={que} />
                            <AnswerTextArea que={que} />
                        </div>
                    ))
                    }
                </QuestionDetailsWrapper>
            </>}
        </>

    )
}

const QuestionDetailsWrapper = styled.div`
padding: 2rem;
.initials{
    border-radius: 50% !important;
    background-color: #970d0d  !important;
    color:white !important;
    display: flex !important;
    padding: 0.2rem !important;
    justify-content: center !important;
    align-items: center !important;
    width: 1.5rem !important;
    height: 1.5rem !important;
    text-transform: uppercase !important;
}
.questionDetails{
display: flex;
flex-direction: column;

svg{
  
    font-size: 4rem;
    color: #BABFC4;
}
span{
    color: #6A737C;text-align: center;
    font-size: 1.313rem;
}
}
.deleteShare{
    padding: 0.2rem 0.5rem;
    border: none;
    border-radius: 0.36rem;
    cursor: pointer;
    margin-right: 0.3rem;
}
.questionMainBody{
    span{
        display: inline-block;
    color:#2C5877;
    border-radius: 0.188rem;
    padding: 0.313rem 0.375rem;
    margin: 0.5rem 0.5rem 0.2rem 0;
    background: #D0E3F1;
    text-transform: lowercase;
    font-weight: 500;
    font-size: 0.75rem;
    
    }
}
border-bottom: 0.061rem solid  #D6D9DC;
`
export default QuestionDetails