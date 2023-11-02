import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './login.css'

const Login = ({ LoginUser, loginUserErr }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)

  useEffect(() => {
    if (loginUserErr) {
      setErrorEmail(loginUserErr)
    }
  }, [loginUserErr])

  const submitLogin = (e) => {
    e.preventDefault();
    if (email === '') {
      setErrorEmail('Required')
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorEmail('Invalid email address')
      return;
    }
    if (password === '') {
      setErrorPassword('Required')
      return;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(password)) {
      setErrorPassword('Password must contain minimum eight of characters, at least one letter, one number and one special character')
      return;
    }
    LoginUser({email, password})
    setEmail('')
    setPassword('')
  }

  return (
    <div className='form-container'>
      <div className='loginContainer'>
        <h3>Please login to continue.</h3>
        <form className='login-form' onSubmit={submitLogin}>
          <div className='form-control'>
            <input
              value={email}
              type='text'
              name='text'
              id='text'
              placeholder='Email'
              onChange={(e) => {setErrorEmail(''); setEmail(e.target.value) }}
            />
          {errorEmail && <h5 style={{color: 'red'}}>{errorEmail}</h5>}
          </div>
          <div className='form-control'>
            <input
              value={password}
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              onChange={(e) => {setErrorPassword(''); setPassword(e.target.value)}}
            />
            {errorPassword && <h5 style={{color: 'red'}}>{errorPassword}</h5>}
          </div>
          <div className='form-control'>
            <input
              type="submit"
              value="Login"
              className="btn btn-block"
            />
          </div>
          <div className='form-control'>
            <div className='btn-signup'>
              <Link to='/signup' className='link' >Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login