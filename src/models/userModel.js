const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value < new Date();
      },
      message: "Date of Birth must be a past date"
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE", "QUEER"],
    uppercase: true
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: [12, "Aadhar Number must be exactly 12 digits"],
    maxlength: [12, "Aadhar Number must be exactly 12 digits"],
    match: [/^\d{12}$/, "Aadhar Number must contain only 12 digits"]
  },
  vid: {
    type: String,
    minlength: [16, "VID must be exactly 16 digits"],
    maxlength: [16, "VID must be exactly 16 digits"],
    match: [/^\d{16}$/, "VID must contain only 16 digits"],
    required: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
