const jwt = require("jsonwebtoken");
const response = require("../utils/response");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token)
  {
    return response.unauthorizedResponse(res,"Unathorized");
  }
  // console.log(token);
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      console.error('JWT verification failed:', err.message);
      return response.unauthorizedResponse(res,"Sign in required");
    } else {
      // console.log('JWT verified successfully:', decoded);
      const user ={_id : decoded._id};
      //verify deleted user
      
      req.user = user;
      next();
    }
  });
};