import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
const Questions = ({ questionHead, questionList }) => {

    return (
        <QuestionWrapper>
            {questionList.data == null ? <p>Loading...</p> :
                <> <div className='queTitle'>
                    <p>{questionHead}</p>
                    <Link to='/askquestions'>  <Button style={{ marginTop: '1.5rem', height: "2.3rem", background: "#0a95ff", boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }}>Ask Questions</Button></Link>
                </div>
                    <div style={{ marginBottom: "0.7rem" }}>
                        <p> {questionList.data.length} questions</p>
                    </div>
                    {questionList.data.map((que) => (
                        <div className='questions'>
                            <div className='votes'>
                                <p> {que?.upVote.length} <span>votes</span> </p>
                                <p> {que?.answer.length} <span>answers</span></p>
                            </div>
                            <div style={{ flex: 1, textAlign: "left" }}><Link to={`/questions/${que._id}`}><p style={{ color: "#0074cc", cursor: 'pointer' }}>{que?.questionTitle}</p></Link>
                                <div className='tagstime'><div style={{
                                    width: '70%',textAlign: "left",paddingLeft:0
                                }}>
                                    {que?.questionTags.map((tag) => <span className='tags'>{tag}</span>)}</div>
                                    <span className='time'>{moment(que?.postedOn).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </>}
        </QuestionWrapper>
    )
}
const QuestionWrapper = styled.div`
margin-top: 1.2rem;
padding: 1rem;
.queTitle{
    display: flex;
    align-items: center;
    p{
        flex: 1;
        font-size:1.6rem;
    }
}
.questions{
    border-top : 1px solid  #E3E6E8;
    display: flex;
    align-items: center;
    div{
        padding: 1rem;
        text-align: center;
    }
}
.votes{
    color:  #0C0D0E;
   font-size:0.813rem ;
   span{
    margin-left:0.1rem;
   }
}
.tagstime{
   padding: 0!important;
   display: flex;
   align-items: center;
   position: relative;
   
   .tags{
  display: inline-block;
  
   }
   .time{
    position: absolute;
    right: 0;
    font-size: 0.7rem;
    font-weight: 600;
   }
}

.tags{
    display: inline-block;
    color:#2C5877;
    border-radius: 0.188rem;
    padding: 0.313rem 0.375rem;
    margin: 0.5rem 0.6rem 0 0;
    text-transform: lowercase;
    background: #D0E3F1;
    font-weight: 500;
    font-size: 0.75rem;
}
`

export default Questions