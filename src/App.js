import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css';
import Login from './components/login/login'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'
import Header from './components/Header/Header'

function App() {
  const [user, setUser] = useState(null)
  const [allShows, setAllShows] = useState([])
  const [checkEpiChange, setCheckEpiChange] = useState(true)
  const [createUserErr, setCreateUserErr] = useState('')
  const [loginUserErr, setLoginUserErr] = useState('')
  const navigate = useNavigate()


  const CreateUser = (newUser) => {
    //Register post request
    axios.post('http://localhost:8080/api/signup', newUser)
    .then((res) => {
      if (res.data.error) {
        setCreateUserErr(res.data.error)
      } else {
        localStorage.setItem('token', res.data.token)
        //Set User and navigate to home page
        getUser(res.data.userId)
        navigate("/home")
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const getUser = (userId) => {
    let userdata = {params: {_id: userId}};
    axios.get('http://localhost:8080/api/getuser', userdata)
    .then((res) => {
      setUser(res.data.user)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const LoginUser = (user) => {
    //Login post request
    axios.post('http://localhost:8080/api/login', user)
    .then((res) => {
        //Set User and token for refresh then navigate to home page
        setUser(res.data.user)
        // Stringify user Id then store in localStorage + token
        let userId = JSON.stringify(res.data.user._id)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', userId)
        navigate("/home");
    })
    .catch((err) => {
      setLoginUserErr('Email & password do not match.')
      // console.log(err)
    })
  }

  //Log out
  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    axios.get('http://localhost:8080/api/logout')
    .then((res) => {
      setUser(null)
      navigate("/");
    })
    .catch((err) => {
      console.log('Logout error', err)
    })
  }

    //Session persist
  useEffect(() => {
    const loggedInUser = localStorage.getItem('token')
    const UserId = window.localStorage.getItem('userId')
    if (loggedInUser) {
      //Parse Id then get user
      const userId = JSON.parse(UserId)
      getUser(userId)
    }
  }, [])





  // useEffect(() => {
  //   getShows();
  // }, [])

  // const getShows = () => {
  //   axios.get('http://localhost:8080/api/getshows')
  //   .then((res) => {
  //      setAllShows(res.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  // const addShow = (movie) => {
  //   //Make api call then add to favourite list
  //   axios.post('http://localhost:8080/api/addshow', { userId: user._id, movieId: movie._id })
  //   .then((res) => {
  //     getUser();
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //   })
  // }

  // const removeShow = (movie) => {
  //   //Make api call then remove from list
  //   axios.post('http://localhost:8080/api/removeshow', { userId: user._id, movieId: movie._id })
  //   .then((res) => {
  //     getUser();
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //   })
  // }

  return (
    <div>
      {user && <Header handleLogout={handleLogout} />}
        <Routes>
           {!user && <Route path='/' element={<Login LoginUser={LoginUser} loginUserErr={loginUserErr} />} />}
           {!user && <Route path='/signup' element={<SignUp CreateUser={CreateUser} createUserErr={createUserErr} />} />}
          {user && <Route exact path='/home' element={<Home allShows={allShows} user={user} checkEpiChange={checkEpiChange} />} /> }
        </Routes>
    </div>
  );
}

export default App;