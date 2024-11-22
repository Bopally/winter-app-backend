const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Import routes
const skiStudentRoutes = require("./routes/skiStudentRoutes.js");
const skiInstructorRoutes = require("./routes/skiInstructorRoutes.js");
const skiCourseRoutes = require("./routes/skiCourseRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

// Import middleware
const authenticateToken = require("./middleware/authenticateToken");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/winterapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

app.use(express.json());

// Use routes
app.use("/students", skiStudentRoutes);
app.use("/instructors", skiInstructorRoutes);
app.use("/courses", skiCourseRoutes);
app.use("/auth", authRoutes);

// Protected route
app.get("/protected-route", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

app.get("/", (req, res) => {
  res.send("Winter App!");
});

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
