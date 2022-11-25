import React, { useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import copy from 'copy-to-clipboard';
import { useParams } from 'react-router-dom';
import { deleteAnswerAction, getAllQuestionAction } from '../../redux/actions/questionAction';


const Answer = ({ answerData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestionAction())
    }, [dispatch])
    const url = window.location.href
    const handleShare = () => {
        copy(url)
        window.alert("URL copied to clipboard")
    }
    const { id } = useParams()

    const handleDelete = (answerId, noOfAnswer) => {
        console.log(noOfAnswer);
        dispatch(deleteAnswerAction(id, answerId, noOfAnswer - 1));
    }
    var User = useSelector(state => state.currentUserReducer)

    return (

        <AnswerWrapper>
            <p style={{ fontWeight: "500", fontFamily: "Open Sans", fontSize: "1.2rem" }}> {answerData.answer.length} <span>Answers</span></p>
            {
                answerData.answer.map((ans, index) => (
                    <>
                        <div className="questionMainBody" key={index} style={{ flex: 1 }}>
                            <p style={{
                                marginTop: "1.1rem", fontSize: "0.89rem", borderTop: "0.06rem solid #d6d9dc",
                                paddingTop: "1rem"
                            }}> {ans.answerBody}</p>
                            <div style={{ position: 'relative', height: "2rem", padding: "2.1rem" }}>
                                <div style={{ position: 'relative', bottom: 0 }}>
                                    <button className='deleteShare' onClick={handleShare} >Share</button>
                                    {User?.user?._id === ans?.userId && <button onClick={() => handleDelete(ans?._id, answerData.noOfAnswer)} className='deleteShare'>Delete</button>}</div>
                                <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                                    <p style={{ fontWeight: "500", fontSize: "0.813rem" }}>{moment(ans.answeredOn).fromNow()}</p>

                                    <p style={{ fontWeight: "500", fontSize: "0.813rem", display: 'flex', alignItems: "center" }}> <span className="initialsforanswers">{ans.userAnswer[0]}</span>{ans.userAnswer}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ))
            }
        </AnswerWrapper>
    )
}

const AnswerWrapper = styled.div`
padding: 2rem;
padding-bottom:1rem;
.questionMainBody{
    span{
        display: inline-block;
    color:#2C5877;
    border-radius: 0.188rem;
    padding: 0.313rem 0.375rem;
    margin: 0.5rem 0.5rem 0.2rem 0;
    background: #D0E3F1;
    text-transform: uppercase !important;
    font-weight: 500;
    font-size: 0.75rem;
 
    }
    height: fit-content;
}
border-top: 0.061rem solid  #D6D9DC;border-bottom: 0.065rem solid #d6d9dc;
.initialsforanswers{
    border-radius: 50% !important;
    background-color: #003374 !important;
    color:white !important;
    display: flex !important;
    padding: 0.2rem !important;
    justify-content: center !important;
    align-items: center !important;
    width: 1.5rem !important;
    height: 1.5rem !important;
}
`
export default Answer