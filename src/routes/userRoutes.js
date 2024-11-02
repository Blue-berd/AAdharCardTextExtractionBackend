const userRouter = require("express").Router();
const userController = require("../controllers/userControllers.js");
const upload = require("../middlewares/multer.js");

userRouter.post("/", userController.addUser);
userRouter.post(
  "/uploadaadhar",
  upload.single("aadharCard"),
  userController.uploadFile
);

module.exports = userRouter;
