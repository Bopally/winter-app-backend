const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SkiStudent = require("../models/SkiStudent");
const SkiInstructor = require("../models/SkiInstructor");

// Function for connection
async function loginUser(req, res, Model) {
  try {
    // Check if the user exist
    const user = await Model.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    // Check is the password match
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password." });

    // creation of JWT token
    const token = jwt.sign(
      { _id: user._id, role: Model.modelName },
      "your_jwt_secret_key",
      { expiresIn: "1h" }
    );
    res.json({ token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Student Login
router.post("/login/student", async (req, res) => {
  await loginUser(req, res, SkiStudent);
});

// Instructor Login
router.post("/login/instructor", async (req, res) => {
  await loginUser(req, res, SkiInstructor);
});

module.exports = router;
