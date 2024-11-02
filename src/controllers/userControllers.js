const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const sharp = require("sharp");
const Tesseract = require("tesseract.js");
const path = require("path");
const extractAadhaarDetails = require("../utils/extractCardDetails.js");
const uploadDir = path.join(__dirname, "../../uploads");

const uploadFile = async (req, res) => {
  const imagePath = path.join(uploadDir, req.file.filename);

  try {
    const processedImageBuffer = await sharp(imagePath)
      .grayscale()
      .normalize()
      .toBuffer();

    Tesseract.recognize(processedImageBuffer, "eng")
      .then(async ({ data: { text } }) => {
        console.log("Extracted Text:", text);
        const details = await extractAadhaarDetails(text);

        res.status(201).send({ success: true, details, status_code: 201 });
      })
      .catch((error) => {
        console.error("OCR Failed:", error);
        res.status(500).send({ success: false, message: "OCR Failed", error });
      });
  } catch (error) {
    console.error("Image Processing Failed:", error);
    res
      .status(500)
      .send({ success: false, message: "Image Processing Failed", error });
  }
};

const addUser = async (req, res) => {
  const { name, dob, gender, aadharNumber, vid } = req.body;

  const user = new User({
    name,
    dob,
    gender,
    aadharNumber,
    vid,
  });

  try {
    const savedUser = await user.save();
    console.log("User added successfully:", savedUser);
    res.status(201).send({ success: true, user: savedUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send({
      success: false,
      message: "Failed to add user to the database",
      error,
    });
  }
};

module.exports = { uploadFile, addUser };
