const express = require("express");
const router = express.Router();
const SkiStudent = require("../models/SkiStudent");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await SkiStudent.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific student by ID
router.get("/:id", getStudent, (req, res) => {
  res.json(res.student);
});

// CREATE a new student
router.post("/", async (req, res) => {
  const student = new SkiStudent({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to get student by ID
async function getStudent(req, res, next) {
  let student;
  try {
    student = await SkiStudent.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: "Cannot find student" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
}

module.exports = router;
