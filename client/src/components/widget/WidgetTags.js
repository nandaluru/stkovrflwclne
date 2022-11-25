import React from 'react'
import styled from 'styled-components'

const WidgetTags = () => {
    const tags = ['MongoDB', 'Node JS', 'React JS', 'Express JS', 'C++', 'JAVA', 'HTML','CSS', "JavaScript"]
    return (
        <WidgetTagWrapper>
            <div className='widgetTitle'>
                <p>Watched Tags</p>
            </div>
            <div className='widgetContent'>
                {
                    tags.map((tag,key) => <span key={key}>{tag}</span>)
                }
            </div>
        </WidgetTagWrapper>
    )
}

const WidgetTagWrapper = styled.div`
font-size: 0.813rem;
box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
margin-top: 2rem;
.widgetTitle{
    font-family: 'Open Sans';
    background-color:  #F9F8F9;
    font-weight: 600;
    color: #0c0d0e;
  /* border-top  : 0.061rem solid  #F1E5BC;
  border-bottom: 0.061rem solid  #F1E5BC; */
  padding: 0.75rem 0.9rem;
}
.widgetContent{
  
  padding: 0.75rem 0.9rem;
 span{
    display: inline-block;
    color:#2C5877;
    border-radius: 0.188rem;
    padding: 0.313rem 0.375rem;
    margin: 0.5rem 0.4rem;
    background: #D0E3F1;
    text-transform: lowercase;
    font-weight: 500;
    font-size: 0.75rem;
 }
}`
export default WidgetTags