const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware function to grab jwt and decode it
// We declare the function here and basically import it in whevener file we need it (it is used to protect routes)
module.exports = function (req, res, next) {
  // Checking to see if there is a token in the header
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not totken
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // If there is a payload, we send it to user so we can access it from our routes
    req.user = decoded.user;
    // If everything is ok, we continue
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
