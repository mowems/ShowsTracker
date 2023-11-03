
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
