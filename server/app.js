const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./model/User');
require('./model/Post');
const router = require('./routes/router');
const dotenv = require('dotenv');
const path = require('path');
const PostRoute = require('./routes/Post_Route')

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true }));


const port = process.env.PORT || 8080;
mongoose.connect(`mongodb+srv://dimpy:${process.env.DB_PASSWORD}@cluster0.glj5682.mongodb.net/?retryWrites=true&w=majority`)  
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch(err => {
    console.error("Connection error", err.message); 
  });   

app.use('/', router);
app.use('/post', PostRoute);

const server = app.listen(port, () => {
  console.log(`Server is running on port - ${port}`);
});


