import React from 'react'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CreateIcon from '@mui/icons-material/Create';
import WidgetTags from './WidgetTags';
const Widget = () => {
    return (
        <>
            <WidgetWrapper>

                <div className='widgetTitle'>
                    <p>The Overflow Blog</p>
                </div>
                <div className='widgetContent'>
                    <div>
                        <CreateIcon /><p>The many problems with implementing Single Sign-On</p></div>
                    <div>
                        <CreateIcon /><p>Hackathons and free pizza: All about Stack Overflow’s new Student Ambassador...</p> </div>
                </div>
                <div className='widgetTitle'>
                    <p>Featured on Meta</p>
                </div>
                <div className='widgetContent'>
                    <div><ChatBubbleOutlineIcon style={{ color: "#46A2D9" }} />  <p>Announcing the Stack Overflow Student Ambassador Program</p></div>
                    <div> <ChatBubbleOutlineIcon style={{ color: "#46A2D9" }} />     <p> Google Analytics 4 (GA4) upgrade</p></div>
                </div>
            </WidgetWrapper>
            <WidgetTags />
        </>
    )
}

const WidgetWrapper = styled.div`
margin-top: 3rem;
font-size: 0.813rem;
box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);;
.widgetTitle{
    font-family: 'Open Sans';
    background-color:  #FBF3D5;
    font-weight: 600;
    color: #0c0d0e;
  border-top  : 0.061rem solid  #F1E5BC;
  padding: 0.75rem 0.9rem;
border-bottom: 0.061rem solid  #F1E5BC;
}
.widgetContent{
    background-color: #FDF7E2;
  padding: 0.75rem 0.9rem;
  div{
    display: flex;
    align-items: flex-start;
    svg{
        margin-top: 0.6rem;
    margin-right: 0.3rem;
          font-size: 1rem;
    }
  }
p{
    margin: 0.5rem 0;
}
}
`

export default Widget