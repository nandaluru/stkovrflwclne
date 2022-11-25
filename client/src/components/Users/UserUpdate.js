import React, { useEffect } from 'react'
import { useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { currentUser, fetchAllUser, updateUser } from '../../redux/actions/authActions'
const UserUpdate = () => {
    const dispatch = useDispatch();
    var users = useSelector(state => state.allUserReducer);
    const User = useSelector(state => state.currentUserReducer)
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const [about, setAbout] = useState("")
    const [user, setUser] = useState(null);
    const [tags, setTags] = useState("")
    useEffect(() => {
        dispatch(fetchAllUser())
        var array = users.filter((user) => user?._id === User?.user._id)
        setUser(array[0]);
    }, [dispatch])
    const submitData = () => {
        if (name === '' || about === '' || tags === '') {
            window.alert("Fill all fields")
            return;
        }

        if (tags.length === 0)
            dispatch(updateUser(User.user._id, { name, about, tags: User.user?.tags }))
        else
            dispatch(updateUser(User.user._id, { name, about, tags }))

        dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))))
        dispatch(fetchAllUser())
        navigate('/users')

    }
    return (
        <UserUpdateWrapper>
            <div className='userdetailcard'>
                <div>
                    <h1>Edit your Profile</h1>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>

                    <div className='nameInitals'>
                        <p>{user?.name[0]?.toUpperCase()}</p>
                    </div>
                    <div className='userDetails'>
                        <p className='name'>{user?.name}</p>
                        <p className='joined'>joined {moment(user?.joinedOn).fromNow()}</p>
                    </div>
                </div>
            </div>
            <div className='about'>
                <p style={{ fontSize: "1rem", fontWeight: 500 }}>About</p>
                <p style={{ fontSize: "0.8rem", }}>{user?.about}</p>
            </div>
            <div className="userUpdate">
                <p className='inputfield'>Display Name</p>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                <p className='inputfield'>About</p>
                <input type="text" onChange={(e) => setAbout(e.target.value)} value={about} />
                <p className='inputfield'>Tags</p>
                <input type="text" onChange={(e) => setTags(e.target.value.split(" "))} />
                <button onClick={submitData}> Submit</button>
            </div>
        </UserUpdateWrapper>
    )
}

const UserUpdateWrapper = styled.div`
padding: 2rem;
.inputfield{
    margin-top: 1rem;
}
input{
margin-top: 0.2rem; width: 100%; padding: 0.5rem 0.563rem; border-radius: 0.18rem;
outline: none; border: 1px solid grey;
&:hover,&:focus,&:active{
box-shadow: rgba(0, 116, 204, 0.15) 0px 0px 0px 4px;
border: 0.063rem solid  #59A4DE;}
}
button{
    border:1px solid grey;
    margin-top: 2rem;
    border-radius: 0.71rem;
    font-weight: 500;
    padding:1rem;
    cursor: pointer;
    background: rgb(225, 236, 244);
    color: rgb(44, 88, 119);
    text-transform: capitalize;
    border: 0.063rem solid rgb(122, 167, 199);
}
.userdetailcard{
  display: flex;
  flex-direction: column;
  gap: 1rem;
.nameInitals{
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  font-size: 3rem;
  background-color: purple;
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}
.userDetails{
  margin-top: 0.51rem;
  .name{
    font-weight: 500;
    text-transform: capitalize;
  }
  .joined{
    font-size: 0.8rem;
    color: #484848;
  }
}

}
`
export default UserUpdate