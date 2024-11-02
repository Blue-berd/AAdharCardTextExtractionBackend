require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/userRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("files", req.files);
  next();
});

const uploadDir = path.join(__dirname, "../", "uploads");

app.use("/api/user", userRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
