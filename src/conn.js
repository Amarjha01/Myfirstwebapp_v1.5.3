// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://amarjha880:CQlHNlLlkHtUC0X8@cluster1.vl2yo5n.mongodb.net/collegeDB', { useNewUrlParser: true, useUnifiedTopology: true });

require("dotenv").config(); // Load environment variables from .env file

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI; // Replace with your actual variable name

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
