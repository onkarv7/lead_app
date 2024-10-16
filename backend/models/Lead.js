// models/Lead.js
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String, required: true },
  linkedInProfile: { type: String, required: true },
  jobTitle: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model("Lead", leadSchema);
