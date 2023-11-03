const db = require('../../db/db.js');

module.exports = {
  postShows: (body, cb) => {
    try {
      db.Shows.insertMany(body)
    } catch (e) {
      console.log(e)
    }
  },
  getShows: (body, cb) => {
    try {
      db.Shows.find()
      .then((result) => {
        cb(null, result);
      })
      .catch((err) => {
        cb(err);
      })
    } catch (e) {
       console.log(e)
    }
 },
}