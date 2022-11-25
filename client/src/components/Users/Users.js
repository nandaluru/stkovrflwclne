import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Users = () => {


  var allUser = useSelector(state => state.allUserReducer)
  return (
    <UserWrapper>
      {
        allUser.map((user) => (
          <Link key={user._id} to={`/users/${user?._id}`}>
            <div className="usersCard">
              <div className='logo'><p >{user?.name[0]?.toUpperCase()}</p></div>
              <p className='name'>{user?.name}</p>
            </div>
          </Link>))
      }
    </UserWrapper>
  )
}
const UserWrapper = styled.div`
margin-top: 2rem;
padding: 2rem;
gap: 2rem;
display: flex;
flex-wrap: wrap;
.usersCard{
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.51rem;
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 2rem;
    height: 2rem;text-transform:uppercase;
    color: white;
    padding: 0.5rem;
    border-radius: 50%;
    background-color: red;
  }
  .name{
    font-family: 'Open Sans';
    font-weight:600 ;
    text-transform: capitalize;
  }
}
`
export default Users