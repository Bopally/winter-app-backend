const jwt = require("jsonwebtoken");

// Secret key for JWT, retrieved from environment variables or default
const JWT_SECRET = process.env.JWT_SECRET ?? "your_jwt_secret_key";

// Middleware to authenticate JWTs
function authenticateToken(req, res, next) {
  const authorization = req.header("Authorization");
  const token = authorization.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied." });

  // Verify token and attach user info to request
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = authenticateToken;
