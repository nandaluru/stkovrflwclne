import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../../Assets/logo-stackoverflow.png"
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material'
import decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import UserLoginToggle from './UserLoginToggle';
import { currentUser, fetchAllUser } from '../../redux/actions/authActions'
import { UserContext } from '../../context'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useContext(UserContext)
  var User = useSelector((state) => state.currentUserReducer)
  const handleLogout = () => {
    setIsLogin(false);
    dispatch({
      type: "LOGOUT"
    })
    dispatch(currentUser(null))
    navigate('/')
  }
  useEffect(() => {
    const token = User?.token
    if (token) {
      const decodeToken = decode(token)
      if (decodeToken.exp * 1000 < new Date.getTime()) {
        handleLogout();
      }
    }
    dispatch(fetchAllUser())
    dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))))
  }, [dispatch])

  return (
    <Nav>
      <Container maxWidth={'lg'} className="nav">
        <Link to='/'>
          <div className='logo'>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        {/* <div className='About'>
          <p >About</p>
        </div>
        <div className='Products'>
          <p >Products</p>
        </div>
        <div className='For-teams'>
          <p>For Teams</p>
        </div> */}
        <div className='auth'>
          <div className='search'>
            <SearchIcon />
            <input type="text" placeholder='Search...' />
          </div>
          {User ? <UserLoginToggle handleLogout={handleLogout} /> :
            <>
              <div className='login'>
                <Link to='/auth'>
                  <Button style={{ height: '2rem', background: " hsl(205,46%,92%)", color: "#2C5877", fontSize: "0.813rem", textTransform: "capitalize", border: "0.063rem solid #7AA7C7" }}>Login</Button>
                </Link>
              </div>
              <Link to='/auth'>
                <div className='signup'>
                  <Button style={{ height: "2rem", background: " #0074CC", color: "white", fontSize: "0.813rem", textTransform: "capitalize", }}>Sign Up</Button>
                </div>
              </Link>
            </>}
        </div>
      </Container>
    </Nav>
  )
}

const Nav = styled.div`
position: sticky;
top:0;
z-index: 1000;
border-top: 0.18rem solid #f48225;
      background-color: #f8f9f9;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.05) 0px 1px 4px 0px, rgba(0, 0, 0, 0.05) 0px 2px 8px 0px;
.nav{
      display: flex;
      align-items: center;
      min-height: 2.9rem;
      gap: 2rem;
      
      .logo{
        img{
        width: 9rem; }  
      }
      .About,.Products,.For-teams{
      p{
        font-size: 0.813rem;
        color:hsl(210,8%,35%);
        }
      }
      .search{
        display: flex;
        align-items: center;
        position: relative;
        svg{
          position: absolute;
          top: 0.3rem;
          left: 0.5rem;      
          color:#757575 !important;
          
        }
        flex:1;
        input{
          width: 100%;
          outline:hsl(210,8%,35%);
          border: 0.061px solid  #BABFC4;
          height: 2rem;
          border-radius: 0.188rem;
          padding: 0.5rem 0.591rem;
          padding-left:2rem ;
        }
      }
      .auth{
        display: flex;
        flex:1;
        gap:0.3rem;
      }
    }
    @media screen and (max-width:400px) {
      .nav{ 
        gap: 0.2rem !important;
 
      .logo{
        img{
          width: 8rem;
        }
      }    }
    }
    
      `
export default Navbar