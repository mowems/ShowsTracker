const mongoose = require('mongoose')
const crypto = require("crypto")
const uuidv1 = require("uuid/v1")


 //Db schema for users
 const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  favouriteShows: [],
  watchedEpisodes: [], //{ show: String, episode: String }
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
 });

 //Db schema for all shows
 const showsSchema = new mongoose.Schema({
  title: String,
  favourited: Boolean,
  poster_path: String,
  episodes: []
 });

 userSchema.virtual("password")
    .set(function (password) {
      this._password = password;
      this.salt = uuidv1();
      this.encry_password = this.securePassword(password);
    })
    .get((password) => {
      return this._password;
  })

  userSchema.methods = {
   authenticate: function(plainPassword) {
     return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function(plainPassword) {
    if(!plainPassword) return "";

    try {
      return crypto.createHmac('sha256', this.salt).update(plainPassword).digest('hex');
    } catch (err) {
      return ""
    }
  }
}

const User = mongoose.model('User', userSchema, 'user');
const Shows = mongoose.model('Shows', showsSchema, 'shows');

module.exports = { User, Shows };