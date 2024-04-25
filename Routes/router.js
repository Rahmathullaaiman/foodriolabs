const express = require('express')


const usercontroll = require('../controller/usercontroll')
const menuscontroll = require('../controller/menucontroll')


const multerconfig = require('../Middlewares/multer')
const jwtmiddleware = require('../Middlewares/jwtconfig')


const router = new express.Router()


//Router paths-->
//register
router.post('/user/register',usercontroll.register)

//login
router.post('/user/login',usercontroll.login)

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