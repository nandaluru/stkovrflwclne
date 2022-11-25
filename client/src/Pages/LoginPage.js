import React, { useState } from 'react'
import Logincard from '../components/Auth/Logincard'
import SignUpCard from '../components/Auth/SignUpCard';

const LoginPage = () => {
  const [toggleCard, setToggleCard] = useState(true);
  const toggleCardFunc = () => {
    setToggleCard(!toggleCard);
  }
  return (
    <div>
      {
        !toggleCard ?
          <Logincard toggleCardFunc={toggleCardFunc} /> :
          <SignUpCard toggleCardFunc={toggleCardFunc} />
      }
    </div>
  )
}

export default LoginPage