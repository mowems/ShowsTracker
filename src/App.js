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
  // const [token, setToken] = useState(null)
  // const navigate = useNavigate();

  // useEffect(() => {
  //   addAllShows(
  //     [
  //       {
  //         id: 1, title: "House of The Dragon",
  //         favourited: false,
  //         poster_path: 'https://egoamo.co.za/cdn/shop/products/HouseoftheDragon_DragonThrone_Poster-moviePoster_1024x1024@2x.jpg?v=1679388867',
  //         episodes: [{id: 1, title: 'Ep 1', watched: false}, {id: 2, title: 'Ep 2', watched: false}, {id: 3, title: 'Ep 3', watched: false}, {id: 4, title: 'Ep 4', watched: false}, {id: 5, title: 'Ep 5', watched: false}, {id: 6, title: 'Ep 6', watched: false}, {id: 7, title: 'Ep 7', watched: false}, {id: 8, title: 'Ep 8', watched: false}, {id: 9, title: 'Ep 9', watched: false}, {id: 10, title: 'Ep 10', watched: false}, {id: 11, title: 'Ep 11', watched: false}]
  //       },
  //       {
  //         id: 2, title: "Game of Thrones",
  //         favourited: false,
  //         poster_path: 'https://egoamo.co.za/cdn/shop/products/PP34200_-_GoT_-_John_Snow_-_Winter_is_here_1024x1024@2x.jpg?v=1558992556',
  //         episodes: [{id: 1, title: 'Ep 1', watched: false}, {id: 2, title: 'Ep 2', watched: false}, {id: 3, title: 'Ep 3', watched: false}, {id: 4, title: 'Ep 4', watched: false}, {id: 5, title: 'Ep 5', watched: false}, {id: 6, title: 'Ep 6', watched: false}, {id: 7, title: 'Ep 7', watched: false}, {id: 8, title: 'Ep 8', watched: false}, {id: 9, title: 'Ep 9', watched: false}, {id: 10, title: 'Ep 10', watched: false}, {id: 1, title: 'Ep 11', watched: false}, {id: 12, title: 'Ep 12', watched: false}, {id: 13, title: 'Ep 13', watched: false}, {id: 14, title: 'Ep 14', watched: false}]
  //       },
  //       {
  //         id: 3, title: "Iron Fist",
  //         favourited: false,
  //         poster_path: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSbsedhjJSEs1JT_Rbjg06wi4avzej5XAn6E3m6l-BQjI-E_3Yn',
  //         episodes: [{ title: 'Ep 1', watched: false}, { title: 'Ep 2', watched: false}, { title: 'Ep 3', watched: false}, { title: 'Ep 4', watched: false}, { title: 'Ep 5', watched: false}, { title: 'Ep 6', watched: false}, { title: 'Ep 7', watched: false}, { title: 'Ep 8', watched: false}, { title: 'Ep 9', watched: false}, { title: 'Ep 10', watched: false}]
  //       },
  //       {
  //         id: 4, title: "Mike",
  //         favourited: false,
  //         poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1s1MyHuMl_0feu6M8z2NBdB-5q9mDeSs96HyCFe2ybkIpBl6T',
  //         episodes: [{ title: 'Ep 1', watched: false}, { title: 'Ep 2', watched: false}, { title: 'Ep 3', watched: false}, { title: 'Ep 4', watched: false}, { title: 'Ep 5', watched: false}, { title: 'Ep 6', watched: false}, { title: 'Ep 7', watched: false}, { title: 'Ep 8', watched: false}, { title: 'Ep 9', watched: false}, { title: 'Ep 10', watched: false}, { title: 'Ep 11', watched: false}, { title: 'Ep 12', watched: false}, { title: 'Ep 13', watched: false}]
  //       },
  //       {
  //         id: 5, title: "The Good Mothers",
  //         favourited: false,
  //         poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WUotA8gteRQe9A7yEhnCNVqZQXaiPZRbje42XdZeffEK8J5X',
  //         episodes: [{ title: 'Ep 1', watched: false}, { title: 'Ep 2', watched: false}, { title: 'Ep 3', watched: false}, { title: 'Ep 4', watched: false}, { title: 'Ep 5', watched: false}, { title: 'Ep 6', watched: false}, { title: 'Ep 7', watched: false}, { title: 'Ep 8', watched: false}, { title: 'Ep 9', watched: false}, { title: 'Ep 10', watched: false}, { title: 'Ep 11', watched: false}]
  //       },
  //       {
  //         id: 6, title: "She Hulk: Attorney at Law",
  //         favourited: false,
  //         poster_path: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS7IHDYK6j6jXB-fL7t29KTmhQ25QeomqG0_ikmQCZlEOjHNiZe',
  //         episodes: [{ title: 'Ep 1', watched: false}, { title: 'Ep 2', watched: false}, { title: 'Ep 3', watched: false}, { title: 'Ep 4', watched: false}, { title: 'Ep 5', watched: false}, { title: 'Ep 6', watched: false}, { title: 'Ep 7', watched: false}, { title: 'Ep 8', watched: false}, { title: 'Ep 9', watched: false}, { title: 'Ep 10', watched: false}, { title: 'Ep 11', watched: false}]
  //       },
  //       {
  //         id: 7, title: "Maradona: Blessed Team",
  //         favourited: false,
  //         poster_path: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRUdmAAzeJfX0WoE6T2EYuGOiNZ8ekzfbJorBgi4Ddsva2tsIwA',
  //         episodes: [{ title: 'Ep 1', watched: false}, { title: 'Ep 2', watched: false}, { title: 'Ep 3', watched: false}, { title: 'Ep 4', watched: false}, { title: 'Ep 5', watched: false}, { title: 'Ep 6', watched: false}, { title: 'Ep 7', watched: false}, { title: 'Ep 8', watched: false}, { title: 'Ep 9', watched: false}, { title: 'Ep 10', watched: false}, { title: 'Ep 11', watched: false}]
  //       },
  //     ]
  //   );
  // }, [])

  // const addAllShows = (shows) => {
  //   axios.post('http://localhost:8080/api/addshows', shows)
  //   .then((res) => {
  //     // console.log('Res data :', res.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  const LoginUser = (user) => {
    // console.log('User :', user)
    // //Login post request
    // axios.post('http://localhost:8080/api/login', user)
    // .then((res) => {
    //     console.log('Res data :', res.data.user)
    //     //Set User and token for refresh then navigate to home page
    //     setUser(res.data.user)
    //     // setToken(res.data.token)
    //     let userData = JSON.stringify(res.data.user)
    //     localStorage.setItem('token', res.data.token)
    //     localStorage.setItem('user', userData)
    //     // navigate("/home");
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  }

  //Session persist
  useEffect(() => {
    // const loggedInUser = localStorage.getItem('token')
    // const User = window.localStorage.getItem('user')
    // if (loggedInUser) {
    //   const userData = JSON.parse(User)
    //   console.log("User :", userData)
    //   setUser(userData)
    // }
  }, [])

  //Log out
  const handleLogout = () => {
    // window.localStorage.removeItem('token');
    // window.localStorage.removeItem('user');
    // axios.get('http://localhost:8080/api/logout')
    // .then((res) => {
    //   // navigate("/login");

    // })
    // .catch((err) => {
    //   console.log('Logout error', err)
    // })
  }

  const CreateUser = (newUser) => {
    // //Register post request
    // axios.post('http://localhost:8080/api/signup', newUser)
    // .then((res) => {
    //    console.log('Res data :', res.data)
    //    //Set User and navigate to home page
    //    setUser(res.data.user)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  }

  useEffect(() => {
    // getShows();
  }, [])

  const getShows = () => {
    // axios.get('http://localhost:8080/api/getshows')
    // .then((res) => {
    //    console.log('Res data :', res.data)
    //    setAllShows(res.data)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  }

  const updateWatchedEpi = (show, episode) => {
    // const data = { userId: user._id, show: show.title, episode };
    // console.log('Unwatched :', data)
    // axios.post('http://localhost:8080/api/postwatchedepi', data)
    // .then((res) => {
    //   console.log('update user watched show :', res.data)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  }

  return (

    <Router>
      <Header handleLogout={handleLogout} />
        <Routes>
           {!user && <Route path='/' element={<Login LoginUser={LoginUser} />} />}
           {!user && <Route path='/signup' element={<SignUp CreateUser={CreateUser} />} />}
          {/* {user && <Route exact path='/' element={<Home allShows={allShows} updateWatchedEpi={updateWatchedEpi} user={user} />} /> } */}
        </Routes>
    </Router>
  );
}

export default App;
