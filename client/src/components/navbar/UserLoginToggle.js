import { Button } from '@mui/material'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { UserContext } from '../../context'
import { currentUser } from '../../redux/actions/authActions'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'


const UserLoginToggle = ({ handleLogout }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))))
  }, [dispatch])
  var User = useSelector(state => state.currentUserReducer)
  return (
    <LoginUserWrapper>
      <Link to={`/users/${User?.user._id}`}>
        <div className='userInitials'>
          <p>{User.user.name[0].toUpperCase()}</p>
        </div>
      </Link>
      <div className='login'>
        <Button onClick={handleLogout} style={{ height: '2rem', background: " hsl(205,46%,92%)", color: "#2C5877", fontSize: "0.813rem", textTransform: "capitalize", border: "0.063rem solid #7AA7C7" }}>Logout</Button>
      </div>
    </LoginUserWrapper>
  )
}

const LoginUserWrapper = styled.div`
display: flex;
gap:0.2rem;
.userInitials{
    border-radius: 50%;
    background-color: purple;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    p{
        text-align:center;
    }
}
`

export default UserLoginToggle