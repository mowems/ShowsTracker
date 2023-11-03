const models = require('../Model/modelShows');

module.exports = {
  getShows: (req, res) => {
    models.getShows(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },
  postShows: (req, res) => {
    models.postShows(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },
}