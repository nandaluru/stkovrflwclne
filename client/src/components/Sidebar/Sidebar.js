import React from 'react'
import styled from 'styled-components'
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (

        <SidebarWrapper>
            <Link to='/'>
                <div className='mainTabs'>
                    <p>Home</p>
                </div>
            </Link>
            <div className='mainTabs'>
                <p>PUBLIC</p>
            </div>
            <Link to='/questions'>
                <div className='subTabs'>
                    <PublicIcon />
                    <p>Questions</p>
                </div>
            </Link>
            <Link to='/tags'>
                <div className='subTabs'>
                    <p>Tags</p>
                </div>
            </Link>
            <Link to='/users'>
                <div className='subTabs'>
                    <p>User</p>
                </div>
            </Link>
        </SidebarWrapper>

    )
}

const SidebarWrapper = styled.nav`
display: flex;
min-height: 100vh;
border-right: #F1F2F3 solid 0.13rem;
flex-direction: column;
gap: 0.4rem;
background-color: white;
color:#525960;
font-size: 0.713rem;
.mainTabs{
   padding:1rem ;
    font-family: 'Open Sans';
    cursor: pointer;
}
.subTabs{
    display: flex;
    align-items: center;
    padding:0.5rem 0.375rem;
    margin-left:1.5rem;
    cursor:pointer;
    &:focus, &:active, &:hover{
        font-weight: 600;
        background:#F1F2F3;
        color:#0c0d0e;
        border-right: 0.17rem solid #f48225;
            }
}

@media screen  and (max-width:400px){
    min-height: initial;
}
`
export default Sidebar