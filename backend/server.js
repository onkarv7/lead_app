
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// CORS for the frontend deployment (localhost)
// app.use(
//   cors({
//     origin: "http://localhost:5173",

//      "https://lead-app-bpqj.vercel.app/",

//     credentials: true,
//   })
// );


app.use(cors({
  origin: 'https://lead-application-two.vercel.app', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',        
  credentials: true,                               
}));

// //  CORS for the frontend deployment
// app.use(
// cors({ origin: "https://lead-app-bpqj.vercel.app/", credentials: true });
// );
// //  CORS for the localhost
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRoutes);
// Razorpay Order Route
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: req.body.currency,
      receipt: req.body.receipt,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error in creating Razorpay order");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in creating Razorpay order");
  }
});

// Razorpay Order Validation
app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "Payment success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
