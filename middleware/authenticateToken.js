const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authorization = req.header("Authorization");
  const token = authorization.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied." });

  try {
    const verified = jwt.verify(token, "your_jwt_secret_key");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authenticateToken;
