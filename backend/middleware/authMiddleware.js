const jwt = require("jsonwebtoken");

const SECRET_KEY = "campusbite_secret_key";

function authMiddleware(req, res, next) {

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format." });
  }

  try {

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({ message: "Invalid or expired token." });

  }

}

module.exports = authMiddleware;