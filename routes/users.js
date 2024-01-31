var express = require("express");
var router = express.Router();
const multer = require("multer");


const authenticateUser = require('../middlewares/authenticateUser');
const userController = require("../controllers/userController");
const response = require("../utils/response");




router.post("/login", userController.login);

router.route("/")
.get(userController.getUsers)
.post(userController.addUser)
.delete(userController.deleteAllUsers)

router.get('/verify-token',authenticateUser,(req,res)=>{response.successResponse(res,"valid token")});


router.route('/workdetails')
.get(authenticateUser,userController.getWorkDetails)
.post(authenticateUser,userController.addWorkDetail)
.delete(authenticateUser,userController.deleteWorkDetail)

router.route('/workdetails/:workid')
.get(authenticateUser,userController.getWorkDetail)
.put(authenticateUser,userController.updateWorkDetail)
.delete(authenticateUser,userController.deleteWorkDetail)

module.exports = router;
