import { Button } from '@mui/material'
import React, { useState } from 'react'
import logo from "../../Assets/stack-overflow.png"
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login } from '../../redux/actions/authActions'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context'

const Logincard = ({ toggleCardFunc }) => {
    const [isLogin, setIsLogin] = useContext(UserContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({ email: "", password: "" });
    const handleCred = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const handleLogin = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_API}login`, user)
        if (data) {
            dispatch(login(data))
            setIsLogin(true);
            navigate('/')
        }
    }

    return (
        <LogincardWrapper>
            <img src={logo} alt="logo" />
            <div className='authWrap'>
                <div>
                    <p>Email</p>
                    <input type="email" name='email' onChange={handleCred} value={user.email} />
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" name='password' onChange={handleCred} value={user.password} />
                </div>
                <div className='login-button'>{
                    (user.email !== '' && user.password !== '') ?
                        <Button style={{ marginTop: '1.5rem', height: "2.3rem", background: "#0a95ff", boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }} onClick={handleLogin}>Login</Button> :
                        <Button disabled style={{ marginTop: '1.5rem', height: "2.3rem", background: "#868686", boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }}>Login</Button>
                }

                </div>
            </div>
            <div className='login-signup'>
                <p>Don’t have an account? <span style={{ cursor: "pointer" }} onClick={toggleCardFunc}>Sign up</span></p>
                <p> Are you an employer? <span> Sign up on Talent </span></p>
            </div>
        </LogincardWrapper>
    )
}

const LogincardWrapper = styled.div`
width: 17rem;
position: absolute;
height: fit-content !important;
top:50%;
left:50%;
display: flex;
flex-direction: column;
align-items: center;
transform: translate(-50% ,-50%);
border-radius: 0.28rem;
height: 14rem;
img{
    width: 3rem;
    margin-bottom:2rem;
}
.authWrap{
    box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px, rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
    padding: 2rem;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
}
p{
    font-size: 0.933rem;
    font-weight: 600;
    color:#0C0D0E;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 0.15rem;
}
input{
    border: 0.061rem solid  #BABFC4;
    padding: 0.5rem 0.54rem;
    border-radius: 0.188rem;
    &:active, &:focus{
        outline: 0.061rem solid  #59A4DE;
     box-shadow:   rgba(0, 116, 204, 0.15) 0px 0px 0px 4px;
    }
}
.login-button{
   
    width: 100%;
    button{
        width: 100%;
    }
}
.login-signup{
    margin-top: 2rem;
    text-align: center;
    p{
        font-family: 'Open Sans';
        font-size: 0.813rem;
        color: #232629;
        font-weight: 400;
    }
    span{
        font-weight: 400;
        color:   hsl(209,100%,37.5%);
    }
}
`
export default Logincard