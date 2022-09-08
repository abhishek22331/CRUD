require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const CookieParser = require('cookie-parser')
const path = require('path');
const router = require('./userRoutes/userRoutes');
var MongoClient = require('mongodb').MongoClient;


//App Config
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(CookieParser())
app.use('/', require('./userRoutes/userRoutes'))

const URL="mongodb+srv://username:<password>@test.w4sszay.mongodb.net/?retryWrites=true&w=majority";
const Users=require('./userModel/userModel');


Users.find({},function(err,Users){
  if(err)console.log(err);
 
})

//Db Config
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((res) => console.log("database connected")).
catch((err) => console.log("error in database connectivity"))



const port = 4000
app.listen(port, () => {
    console.log(`listening port localhost : ${port}`)
})

