const Users = require("../models/userModel");
const safe = require("../utils/safe");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const response = require("../utils/response");
const validatePassword = require("../utils/validatePassword");
const generateToken = require("../utils/generateToken");

exports.getUsers = safe(async (req, res) => {
  const users = await Users.find({}).populate("district company state");
  response.successResponse(res, users);
});

exports.addUser = safe(async (req, res) => {
  const {
    username,
    password,
    firstname,
    lastname,
    gender,
    address,
    district,
    state,
    company,
  } = req.body;
  const user = new Users({
    username,
    password,
    firstname,
    lastname,
    gender,
    address,
    district,
    state,
    company,
  });
  const exist = await Users.findOne({ username: username });
  // console.log(exist);
  if (exist) {
    return response.unauthorizedResponse(res, "Username already Exist");
  }
  const ok = await validatePassword(password);
  if (!ok) {
    return response.unauthorizedResponse(
      res,
      "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    );
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  const data = await Users.create(user);
  await user.save();
  response.successfullyCreatedResponse(
    res,
    data,
    "User created Successfully!!"
  );
});

exports.login = safe(async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username: username });
  if (!user) return response.unauthorizedResponse(res, "Invalid Credentials!");
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) {
    return response.unauthorizedResponse(res, "Invalid Credentials!");
  }
  const jwtToken = await generateToken(user);
  return response.successResponse(
    res,
    { user: user, token: jwtToken },
    "login Successfull!!"
  );
});

exports.deleteAllUsers = safe(async (req, res) => {
  const users = await Users.deleteMany({});
  response.successResponse(res, users, "successfully deleted all users!!");
});

exports.getWorkDetails = safe(async (req, res) => {
  // console.log(req.user);
  const user = await Users.findById(req.user._id, { workDetails: 1 });
  response.successResponse(res, user);
});

exports.addWorkDetail = safe(async (req, res) => {
  const { name, month, hours } = req.body;
  
  // console.log(req.body)
  if(hours < 0)
  {
    // const err = new Error({hours: "Hours can not be negative"})
    return response.badRequestResponse(res,"hours can not be negative!")
  }
  const userid = req.user._id;
  const user = await Users.findByIdAndUpdate(
    userid,
    { $push: { workDetails: { name, month, hours } } },
    
    { new: true, projection:{workDetails:1} }
  );
  
  response.successResponse(
    res,
    user,
    "successfully added work detail of user!!"
  );
});

exports.deleteWorkDetail = safe(async (req, res) => {
  const userid = req.user._id;
  //can delete the field directly
  const users = await Users.findByIdAndUpdate(userid, {
    $set: { workDetails: [] },
  });
  response.successResponse(
    res,
    users,
    "successfully deleted work details of user!!"
  );
});

exports.getWorkDetail = safe(async (req, res) => {
  const userid = req.user._id;
  const users = await Users.findById(userid, { workDetails: 1 });
  response.successResponse(
    res,
    users,
    "successfully deleted work details of user!!"
  );
});

exports.updateWorkDetail = safe(async (req, res) => {
  const userid = req.user._id;
  const workid = req.params.workid;
  // console.log(workid)
  if(req.body.hours && req.body.hours < 0){
    // const err = new Error( "Hours can not be negative")
    return response.badRequestResponse(res,"hours can not be negative!")
  }
  const user = await Users.updateOne(
    { _id: userid, "workDetails._id": workid },
    { $set: { "workDetails.$": req.body } }
  );
  response.successResponse(
    res,
    user,
    "successfully deleted work details of user!!"
  );
});

exports.deleteWorkDetail = safe(async (req, res) => {
  const userid = req.user._id;
  const workid = req.params.workid;
  const resObj = await Users.updateOne(
    { _id: userid },
    { $pull: {"workDetails": {"_id": workid}}  }
  );
  response.successResponse(
    res,
    resObj,
    "successfully deleted work details of user!!"
  );
});
