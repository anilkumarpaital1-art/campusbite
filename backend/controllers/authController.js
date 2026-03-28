const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

/* ================= REGISTER ================= */

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check existing
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const [result] = await db.query(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name, email, hashedPassword]
    );

    res.json({
      success: true,
      message: "Registration successful",
      user: {
        user_id: result.insertId,
        name,
        email
      }
    });

  } catch (err) {
    console.log("Register Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


/* ================= LOGIN ================= */

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const user = rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // create token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email }, // ✅ FIXED
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // response
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,   // ✅ IMPORTANT (frontend needs this)
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


/* ================= FORGOT PASSWORD ================= */

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // (later: send email)
    res.json({
      success: true,
      message: "Password reset link sent (dummy)"
    });

  } catch (err) {
    console.log("Forgot Password Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};