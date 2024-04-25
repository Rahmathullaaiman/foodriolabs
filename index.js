
require('dotenv').config() 


const express = require('express')

const cors = require('cors')

const morgan = require('morgan'); 

const router = require('./Routes/router')

// connection.js file
require('./Database/connection')


const server = express()

server.use(cors())

server.use(express.json())
server.use(morgan('dev'))



server.use(router)

server.use('/uploads',express.static('./uploads'))


const PORT = 9000 || process.env

server.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})



