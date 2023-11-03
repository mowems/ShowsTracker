
const express = require('express');
const path = require('path');
require('dotenv').config()

const connectDB = require('../db/index');
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

const userController = require('./Controller/controllerUser');
const showsController = require('./Controller/controllerShows');

const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/api/signup', userController.signUp)
app.get('/api/getuser', userController.getUser)
app.post('/api/login', userController.login)
app.get('/api/logout', userController.logOut)
app.post('/api/addshows', showsController.postShows)   //All available shows
app.get('/api/getshows', showsController.getShows)      //Get all available shows
app.post('/api/addshow', userController.addShow)      //Add to favourite
app.post('/api/removeshow', userController.removeShow)       //Remove frm favourite
app.post('/api/postwatchedepi', userController.postEpi)       //Post episode watched


if (process.env.NODE_ENV === 'development') {
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
} else {
  app.get("/", function(req, res) {
    res.send("API is running...")
  })
}

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
