const express = require("express");
const router = express.Router();
const SkiCourse = require("../models/SkiCourse");
const authenticateToken = require("../middleware/authenticateToken");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await SkiCourse.find().populate("instructor");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await SkiCourse.findById(req.params.id).populate(
      "instructor"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new course
router.post("/", authenticateToken, async (req, res) => {
  const course = new SkiCourse({
    title: req.body.title,
    instructor: req.body.instructor,
    duration: req.body.duration,
    price: req.body.price,
    level: req.body.level,
    description: req.body.description,
  });
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a course
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const course = await SkiCourse.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // check if the instructor match the course
    if (course.instructor.toString() !== req.user._id) {
      return res.status(403).json({
        message: "Access denied: You are not the instructor of this course",
      });
    }

    if (req.body.title != null) {
      course.title = req.body.title;
    }
    if (req.body.duration != null) {
      course.duration = req.body.duration;
    }
    if (req.body.price != null) {
      course.price = req.body.price;
    }
    if (req.body.level != null) {
      course.level = req.body.level;
    }
    if (req.body.description != null) {
      course.description = req.body.description;
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a course
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const course = await SkiCourse.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // check if the instructor match the course
    if (course.instructor.toString() !== req.user._id) {
      return res.status(403).json({
        message: "Access denied: You are not the instructor of this course",
      });
    }

    await SkiCourse.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Course" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
