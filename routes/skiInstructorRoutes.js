const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const SkiInstructor = require("../models/SkiInstructor");

// GET all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await SkiInstructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new instructor
router.post("/", async (req, res) => {
  const { name, email, password, picture, description, experience } = req.body;

  if (!name || !email || !password || !description || !experience) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const instructor = new SkiInstructor({
      name,
      email,
      password: hashedPassword,
      picture,
      description,
      experience,
    });

    const newInstructor = await instructor.save();
    res.status(201).json(newInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
