//import mongoose
const mongoose = require('mongoose')

//create scheme
const menushceme = new mongoose.Schema({
    Category:{
        type:String
    },
    foodname:{
        type:String
    },
   
    image:{
        type:String,
        require:true
       
    }, 
    price:{
        type:String,
        require:true
       
    },
    userId: {
        type: String,
        require:true
    }
   

})


//create modal
const menus = mongoose.model("menus",menushceme)

//export
module.exports = menus