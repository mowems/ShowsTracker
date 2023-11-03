import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaEye, FaTimes, FaPlus } from 'react-icons/fa'
import Tooltip from 'react-tooltip-lite'

const MovieControls = ({ type, movie, removeShow, addShow, user, checkEpiChange }) => {
  const [watchedEpi, setWatchedEpi] = useState([])
  const [checkBool, setCheckBool] = useState(false)
  const [check, setCheck] = useState(false)
  const [nextEpisode, setNextEpisode] = useState()
  const [episode, setEpisode] = useState(0)
  const [unwatchedEpiTitle, setUnwatchedEpiTitle] = useState('')
  const [episodeIndex, setEpisodeIndex] = useState(0)
  const [maxShowIndex, setMaxShowIndex] = useState(0)
  const [tooltipMessage, setTooltipMess] = useState('')


  useEffect(() => {
    if (user) {
      setWatchedEpi(user.watchedEpisodes)
      checkEpisodes(movie)
    }
  }, [user])

  useEffect(() => {
    checkFavourited()
  }, [movie])

  //Check if Show is added to favourite list
  const checkFavourited = () => {
    let favShArr = user.favouriteShows;
    for (let i = 0; i < favShArr.length; i++) {
      if (favShArr[i] === movie._id) {
        setCheckBool(true)
        return;
      }
    }
    setCheckBool(false)
    return;
  }

  const clickAddRemove = (movie) => {
    if (checkBool) {
      removeShow(movie)
    } else {
      addShow(movie)
    }
    setCheckBool(!checkBool)
  }

  const checkEpisodes = (movie) => {
    let watchedShowId = movie._id;
    let check;
    //Check if watched shows array is defined
    if (user.watchedShows) {
      check = user.watchedShows.includes(watchedShowId);
      //Check if any episode of current show is watched
      if (check) {
        //Iterate through watchedShowsEpisodes arr, check value
        let arr = user.watchedShowsEpisodes;
        arr.map((elem) => {
          let nextEpi = elem[watchedShowId];  //obj: {show: 'Mike', episode: 'Ep 1', showId: '653b652a11770d57ae3dd314', episodeIndex: 1}
          //Check if nextEpi object defined
          if (nextEpi) {
            if (nextEpi.showId === watchedShowId) {
              //Check if value of nextEpisodeIndex
              let maxValue = nextEpi.episodeIndex;
              if (maxShowIndex < maxValue) {
                setMaxShowIndex(maxValue)
              }
            }
          }
        })
      } else {
        if (episodeIndex < movie.episodes.length) {
          setUnwatchedEpiTitle(movie.episodes[0].title)
          setEpisodeIndex(episodeIndex)
        }
      }
    }
  }

  useEffect(() => {
    if (maxShowIndex) {
      let episodes = movie.episodes;
      let episodesLength = episodes.length;
      if (episodeIndex < episodesLength) {
        setEpisodeIndex(maxShowIndex);
        (maxShowIndex < episodesLength) ? setUnwatchedEpiTitle(episodes[maxShowIndex].title) : setUnwatchedEpiTitle(episodes[maxShowIndex - 1].title)
      }
    }
  }, [maxShowIndex])

  const updateWatchedEpi = (show, episode, episodeIndex) => {
    if (episodeIndex < show.episodes.length) {
      setEpisodeIndex(++episodeIndex)
      let epiTitle = movie.episodes[episodeIndex];
      if (epiTitle) {
        setUnwatchedEpiTitle(movie.episodes[episodeIndex].title)
      }
      const data = { userId: user._id, showId: show._id, show: show.title, episode, episodeIndex };
      axios.post('http://localhost:8080/api/postwatchedepi', data)
      .then((res) => {
        // console.log('update user watched show :', res.status)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
          <div className="ctrl-btn" onClick={ () => clickAddRemove(movie)} >
            <Tooltip content={checkBool ? "Remove Show from favourite" : "Add show to favourite"}>
              { !checkBool ? <FaPlus /> : <FaTimes /> }
            </Tooltip>
          </div>
         <div >
            <Tooltip content={(episodeIndex < movie.episodes.length ) ? `Mark ${unwatchedEpiTitle} as watched` : 'All episodes watched'} >
              <button className="ctrl-btn" onClick={() => updateWatchedEpi(movie, unwatchedEpiTitle, episodeIndex)}>
                <FaEye />
              </button>
            </Tooltip>
            <Tooltip content={(episodeIndex < movie.episodes.length ) ? `Next Episode to watch: ${unwatchedEpiTitle}` : 'Well done 🥰'}>
              <div className="nextEpisode">
                {unwatchedEpiTitle}
              </div>
            </Tooltip>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default MovieControls;