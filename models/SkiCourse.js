const mongoose = require("mongoose");

const skiCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkiInstructor",
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SkiCourse", skiCourseSchema);
