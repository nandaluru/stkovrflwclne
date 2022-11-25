import React from 'react'
import styled from 'styled-components'
import { tagsData } from '../dummyData/tags'
const Tags = () => {
    return (
        <TagsWrapper>
            <h2>Tags</h2>
            <div className='tagheading'>
                <p>A tag is a keyword or label that categories your question with other, similar questions.</p>
                <p>Using the right tags makes it easier for others to find and answer your question</p>
            </div>

            <div className="tag-container">
                {
                    tagsData.map((tag) => (
                        <div className="tags-card">
                            <span className='tags'>{tag.tagName}</span>
                            <p className='tags-details'>{tag.tagDetails}</p>
                        </div>
                    ))
                }

            </div>
        </TagsWrapper>
    )
}

const TagsWrapper = styled.div`
padding: 2rem;
.tagheading{
    margin-top: 1rem;
    font-size: 0.8rem;
}
.tag-container{
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    .tags-card{
        padding: 0.51rem;
        border: 0.06rem solid black;
        width: 17rem;
        .tags{
            display: inline-block;
            color:#2C5877;
            border-radius: 0.188rem;
            padding: 0.313rem 0.375rem;
            text-transform: lowercase;
            background: #D0E3F1;
            font-weight: 500;
            font-size: 0.75rem;
        }
        .tags-details{
            margin-top: 0.81rem;
            font-size: 0.8rem;
        }
    }
}
`
export default Tags