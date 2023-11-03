import React from 'react'
import { useState } from "react"
import MovieControls from "../MovieControls/MovieControls"


const MovieCard = ({ movie, type, addShow, removeShow, updateWatchedEpi, user, checkEpiChange }) => {

  return (
    <div className="movie-card" >
      <div className="overlay"></div>
      <img
        src={movie.poster_path}
        alt={`${movie.title} Poster`}
      />
      <MovieControls type={type} movie={movie} addShow={addShow} removeShow={removeShow} updateWatchedEpi={updateWatchedEpi} user={user} checkEpiChange={checkEpiChange} />
    </div>
  );
}

export default MovieCard