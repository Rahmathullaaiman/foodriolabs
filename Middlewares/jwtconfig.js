const jwt = require('jsonwebtoken')

const jwtmiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');


    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

try {
    const jwtresponse = jwt.verify(token,'supersecretkey')
    req.payload = jwtresponse.userId
    next()
} catch (err) {
    res.status(401).json('Authorixazation failed ...please login')
}


}

module.exports = jwtmiddleware