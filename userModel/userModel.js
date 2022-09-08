const mongoose = require('mongoose')

const { options } = require('../userRoutes/userRoutes');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : { 
        type : String,
        required : true
    },
    
})


const userdb= mongoose.model('User', userSchema);
module.exports = userdb;