// const express = require("express");
// // const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// // const authRoutes = require("./routes/authRoutes");

// dotenv.config();

// const app = express();

// // Enable CORS for frontend connection
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(express.json());

// // Routes
// // app.use("/auth", authRoutes);

// // Test route for connection check
// app.get("/test", (req, res) => {
//   res.json({ message: "Backend is connected!" });
// });

// // MongoDB connection
// // mongoose
// //   .connect(process.env.MONGO_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("MongoDB connected"))
// //   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); // Import auth routes

dotenv.config();

const app = express();

// Enable CORS for the frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes); // Use auth routes

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
