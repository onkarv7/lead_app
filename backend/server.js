const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); // Import auth routes

dotenv.config();

const app = express();

//  CORS for the frontend deployment
// app.use(
cors({ origin: "https://lead-app-bpqj.vercel.app/", credentials: true });
// );
//  CORS for the localhost
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes); // Use auth routes

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
