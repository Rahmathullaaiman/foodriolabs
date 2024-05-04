const express = require('express')


const usercontroll = require('../controller/usercontroll')
const menuscontroll = require('../controller/menucontroll')
const otpcontroll = require('../controller/nodemailer')





const multerconfig = require('../Middlewares/multer')
const jwtmiddleware = require('../Middlewares/jwtconfig')


const router = new express.Router()


//Router paths-->
//register
router.post('/user/reg',usercontroll.register)
router.post('/user/otp',usercontroll.verifyOTP)

router.put('/users/block/:id',usercontroll.blockuser);



//login
router.post('/user/login',usercontroll.login)

router.post('/sendmail',otpcontroll.sendEmail)


//edituser to admin

router.put('/edituser/:id',jwtmiddleware, usercontroll.edituser);

//get users
router.get('/users', usercontroll.getAllUsers);

//get admin users
router.get('/users/admin', usercontroll.getAlladminUsers);

//edit user profile
router.put('/user/profile/:id',jwtmiddleware,multerconfig.single('profile'),usercontroll.editprofile)

//add food item
router.post('/add/menu',jwtmiddleware,multerconfig.single('image'),menuscontroll.addmenu)

//edit menu 
router.put('/edit/menu/:id',jwtmiddleware,multerconfig.single('image'),menuscontroll.editmenu)

//get menu
router.get('/menu/get',menuscontroll.getAllmenu);






module.exports=router