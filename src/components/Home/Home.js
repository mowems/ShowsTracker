import React, { useEffect } from 'react'
import MovieCard from "../MovieCard/MovieCard"
import axios from 'axios'
import './Home.css'


const Home = ({ addShow, removeShow, allShows, updateWatchedEpi, user, checkEpiChange }) => {

  return (
    <div className="movie-page">
      <div className="showsContainer">
        <div className="header">
          <h1 className="heading">Available Shows</h1>
        </div>
        {allShows.length > 0 ? (
          <div className="movie-grid">
            {allShows.map((movie) => (
              <MovieCard movie={movie} key={movie._id} type="watchlist" addShow={addShow} removeShow={removeShow} updateWatchedEpi={updateWatchedEpi} user={user} checkEpiChange={checkEpiChange} />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">Currently no movies available! Add some!</h2>
        )}
      </div>
    </div>
  )
}

export default Home