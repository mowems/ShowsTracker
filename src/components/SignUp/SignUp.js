
import React from 'react'
import { useState } from 'react'
import '../login/login.css'


const SignUp = ({ CreateUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(null)

  const registerUser = (e) => {
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
    }
    if (password !== confirmPassword) {
      setErrorPasswordConfirm('Password does not match')
      return;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(password)) {
      setErrorPasswordConfirm('Password must contain minimum eight of characters, at least one uppercase letter, one lowercase letter and one number')
      return;
    }

    CreateUser({email, password})
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='form-container '>
      <div className='loginContainer'>
        <h3>Register with Show Tracker</h3>
        <form className='login-form' onSubmit={registerUser}>
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
              value={confirmPassword}
              type='password'
              name='password'
              id='confirmpassword'
              placeholder='Confirm Password'
              onChange={(e) => {setErrorPasswordConfirm(''); setConfirmPassword(e.target.value)}}
            />
            {errorPasswordConfirm && <h5 style={{color: 'red'}}>{errorPasswordConfirm}</h5>}
          </div>
          <div className='form-control'>
            <input
              type="submit"
              value="Register"
              className="btn btn-block"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp