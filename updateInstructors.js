// This field is useful because when I created I did not add a password property. The code below will create password for instructors without one

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SkiInstructor = require("./models/SkiInstructor");

mongoose
  .connect("mongodb://localhost:27017/winterapp")
  .then(async () => {
    console.log("Connected to MongoDB");

    // Hash by default
    const hashedPassword = await bcrypt.hash("defaultPassword123", 10);

    // Update instructors who do not have a password
    const result = await SkiInstructor.updateMany(
      { password: { $exists: false } },
      { $set: { password: hashedPassword } }
    );
    console.log(result);
    console.log(`Updated ${result.nModified} instructors`);
    mongoose.connection.close();
  })
  .catch((error) => console.error("Could not connect to MongoDB", error));
