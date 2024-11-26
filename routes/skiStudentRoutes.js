const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new SkiStudent({
      name,
      email,
      password: hashedPassword,
    });

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
