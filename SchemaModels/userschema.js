//import mongoose
const mongoose = require('mongoose')

//create scheme
const usershceme = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    profile:{
        type:String
    },
   
    email:{
        type:String,
        require:true,
        unique:true,
        valdator(value){
            if(!validator.isEmail(value))
            {throw new Error('invalid Email')}
        }
    },
    password:{
        type:String,
        require:true
       
    },
    userType: {
        type: String
    }
   

})


//create modal
const users = mongoose.model("users",usershceme)

//export
module.exports = users