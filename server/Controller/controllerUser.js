const { User } = require('../../db/db')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = new User(req.body);

  //Save New User
  await user.save((err, user) => {
    if (err) {
      return res.send({
        error: "Email already taken."
      })
    }

    const userId = user._id;
    //Create token
    const token = jwt.sign({_id: user._id},  "" + process.env.SECRET)
    //PUT TOKEN IN COOKIE
    res.cookie('token', token, {expire: new Date() + 1})
    try {
      return res.json({ status: 'ok', message: 'New user succesfully created', token, userId })
    } catch (err) {
      if (err.code === 11000) {
        return res.json({ status: 'error', error: 'User with this email already exists' })
      }
      throw err
    }
  })
}

exports.getUser = (req, res) => {
  const {_id} = req.query;
  User.findOne({_id}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User with this id not found"
      })
    }
    //Send response
    try {
      const {_id, email, favouriteShows, watchedShowsEpisodes, watchedShows } = user;
      return res.status(200).send({
        user: {
          _id,
          email,
          favouriteShows,
          watchedShows,
          watchedShowsEpisodes
        }
      })
    } catch (err) {
      console.log(err)
    }})
}

exports.login = async (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email not found"
      })
    }
    //Authenticate user
    if(user.authenticate(password) === false) {
      return res.status(400).json({
        error: "Email and password do not match"
      })
    }
    //Create token
    const token = jwt.sign({_id: user._id},  "" + process.env.SECRET)
    //PUT TOKEN IN COOKIE
    res.cookie('token', token, {expire: new Date() + 1})
    //Send response
    const {_id, email, favouriteShows, watchedShowsEpisodes, watchedShows } = user;
    return res.status(200).send({
      token,
      user: {
        _id,
        email,
        favouriteShows,
        watchedShowsEpisodes,
        watchedShows
      }
    })
  })
}

exports.logOut = (req, res) => {
  res.clearCookie("token")
  return res.json({
    message: "User sign out successful"
  })
}

exports.addShow = (req, res) => {
  const { userId, movieId } = req.body;
  User.findOne({userId}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User not found"
      })
    }

    try {
      User.updateOne(
         { _id : userId },
         { $addToSet : {favouriteShows: movieId}}
      )
      .catch((err) => {
        console.log('post error ', err);
      })
    }
    catch (e){
      print(e);
    }
  })
}

exports.removeShow = (req, res) => {
  const { userId, movieId } = req.body;
  User.findOne({userId}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User not found"
      })
    }

    try {
      User.updateOne(
         { _id : userId },
         { $pull : {favouriteShows: movieId}}
      )
      .catch((err) => {
        console.log('post error ', err);
      })
    }
    catch (e){
      print(e);
    }
  })
}

exports.postEpi = (req, res) => {
  const { userId, showId, show, episode, episodeIndex } = req.body;
  let key = showId;
  let obj = {};

  // let nextEpiIndex = episodeIndex + 1;
  obj[key] = { show, episode, showId, episodeIndex };

  User.findOne({userId}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User not found"
      })
    }

  User.updateOne(
    {
      _id : userId
    },
    {
      $addToSet: { watchedShows : showId },
      $push : { watchedShowsEpisodes: obj}
    }
  )
  .catch((err) => {
      console.log('post error with model', err);
    })
  })
  return res.sendStatus(200);
}

