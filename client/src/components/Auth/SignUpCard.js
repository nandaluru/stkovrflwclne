import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../redux/actions/authActions'
import { useContext } from 'react'
import { UserContext } from '../../context'
import { initializeApp } from '@firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";



const SignUpCard = ({ toggleCardFunc }) => {


    var firebaseConfig = {
        apiKey: `${process.env.REACT_APP_API_KEY}`,
        authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
        projectId: `${process.env.REACT_APP_API_KEY}`,
        storageBucket: `${process.env.REACT_APP_PROJECT_ID}`,
        messagingSenderId: `${process.env.REACT_APP_STORAGEBUCKET}`,
        appId: `${process.env.REACT_APP_APPID}`
    };
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    const [isLogin, setIsLogin] = useContext(UserContext)
    const [checked, setchecked] = useState(false)
    const [OTP, setOTP] = useState('')
    const [displayOtp, setDisplayOTP] = useState(false)
    const [user, setUser] = useState({
        name: "", email: "", password: ""
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleCred = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const configureRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                handleLogin();
                console.log("Captcha Verified ");
            },
            defaultCountry: "IN"
        }, auth);
    }


    const handleLogin = () => {
        const phoneNumber = "+91" + user?.phoneNo;
        console.log(phoneNumber);
        configureRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("OTP has been sent")
                setDisplayOTP(true)
            }).catch((error) => {
                console.log(error);
            })
    }
    const validateOTP = () => {
        if (OTP.length != 6)
            return
        window.confirmationResult.confirm(OTP).then((result) => {
            // User signed in successfully.
            const userResult = result.user;
            // console.log(JSON.stringify(userResult))
            alert("User is verified")
            dispatch(signup(user))
            setIsLogin(true);
            navigate('/')
        })
    }
    return (
        <SignUpCardWrapper>
            {!displayOtp ? <div className='authWrap'>

                <div>
                    <p>Display Name</p>
                    <input type="text" onChange={handleCred} name="name" />
                </div>
                <div>
                    <p>Email</p>
                    <input type="email" onChange={handleCred} name="email" />
                </div>
                <div>
                    <p>Phone No</p>
                    <input type="text" onChange={handleCred} name="phoneNo" />
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" onChange={handleCred} name="password" />
                </div>
                <div className='tc'>
                    <input type="checkbox" name="tc" onChange={() => setchecked(!checked)} checked={checked} />
                    <p>Opt-in to receive occasional product updates, user research invitations, company announcements, and digest.</p>
                </div>
                <div id='sign-in-button'></div>
                <div className='login-button'>

                    {((user.name !== "" && user.email !== "" && user.password !== "") && checked) ?
                        <Button onClick={handleLogin} style={{ marginTop: '1.5rem', height: "2.3rem", background: "#0a95ff", boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }}>Sign Up</Button> :
                        <Button disabled style={{ marginTop: '1.5rem', height: "2.3rem", background: "#868686", boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }}>Sign Up</Button>}
                </div>
            </div> :
                <div>
                    <p>Enter OTP send to {user?.phoneNo}</p>
                    <input type="password" onChange={(e) => setOTP(e.target.value)} name="name" />
                    <div className='login-button'>
                        <Button onClick={validateOTP} style={{ marginTop: '1.5rem', height: "2.3rem", background: "#0a95ff", boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }}>Submit OTP</Button>
                    </div>
                </div>
            }
            <div className='login-signup'>
                <p>Already have an account? <span style={{ cursor: "pointer" }} onClick={toggleCardFunc}>Log in</span></p>
                <p> Are you an employer? <span> Sign up on Talent </span></p>
            </div>
        </SignUpCardWrapper>
    )
}

const SignUpCardWrapper = styled.div`
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
        color:  hsl(209,100%,37.5%);
    }
}
.tc{
    display: flex;
    align-items: flex-start;
    gap: 0.2rem;
    p{
        font-size: 0.8rem;
    }
}
`

export default SignUpCard