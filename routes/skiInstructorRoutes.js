const express = require("express");
const router = express.Router();
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
  const instructor = new SkiInstructor({
    name: req.body.name,
    picture: req.body.picture,
    description: req.body.description,
    experience: req.body.experience,
  });
  try {
    const newInstructor = await instructor.save();
    res.status(201).json(newInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
