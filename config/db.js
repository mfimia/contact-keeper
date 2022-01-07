const mongoose = require("mongoose");
// We get the user URI from environment variables
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // This is just a defined setting to avoid console errors
      useNewUrlParser: true,
    });
    // Code below is what executes if we are connected to our database
    console.log("MongoDB Connected");
  } catch (err) {
    // This is the code that executes if there are any errors
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
