const mongoose = require("mongoose");

const skiInstructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware - Hash
skiInstructorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("SkiInstructor", skiInstructorSchema);
