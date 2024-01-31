const jwt = require("jsonwebtoken");
module.exports = async (user) => {
  const jwtToken = jwt.sign(
    {
      username: user.username,
      _id: user._id,
    },
    process.env.SECRETKEY,
    {
      expiresIn: "24h",
    }
  );
  return jwtToken;
};
