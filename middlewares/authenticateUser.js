const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const Users = require("../models/userModel");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token)
  {
    return response.unauthorizedResponse(res,"Unathorized");
  }
  // console.log(token);
  jwt.verify(token, process.env.SECRETKEY, async(err, decoded) => {
    if (err) {
      console.error('JWT verification failed:', err.message);
      return response.unauthorizedResponse(res,"Sign in required");
    } else {
      // console.log('JWT verified successfully:', decoded);
      const user = await Users.findById(decoded._id)
      if(!user)
        response.unauthorizedResponse(res,"User does not exist!")
      // const user ={_id : decoded._id};
      //verify deleted user
      req.user = user;
      next();
    }
  });
};