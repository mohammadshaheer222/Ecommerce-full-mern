const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const { upload } = require("../multer");
const ErrorHandler = require("../Utils/ErrorHandler");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/SendMail");
const catchAsynErrors = require("../Middleware/catchAsynErrors");
const sendToken = require("../Utils/jwtToken");

router
  .route("/create-user")
  .post(upload.single("file"), async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        //upload.single("file") mele middleware vilichathond direct call aavum apo image uploadsil kerum, kayari keryathin maathrame delete cheyyaan patollu because middleware mele vilichathond
        //same gmail kodth signup chythaalum image /uploads folder kerum,athin avoid cheyyaanaan ith use cheyyunnath
        const filenName = req.file.filename;
        const filePath = `uploads/${filenName}`;
        fs.unlink(filePath, (error) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Error Deleting File" });
          }
        });

        //ith normal error handler aan
        return next(new ErrorHandler("User already exists", 400));
      }

      const fileName = req.file.filename;
      const fileUrl = path.join(fileName);

      const user = {
        name, //modelname: destructured value --- same name aanenkil onn kodtha mathi
        email,
        password,
        avatar: {
          public_id: fileUrl,
          url: fileUrl,
        },
      };

      // const newUser = await User.create(user);

      const activationToken = createActivationToken(user);
      const activationUrl = `http://localhost:5173/activation/${activationToken}`;

      //send email
      try {
        await sendMail({
          email: user.email,
          subject: "Activate Your Account",
          message: `Hello ${user.name} Please click on the link to activate your account: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  });

//function to create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.route("/activation").post(
  catchAsynErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User Already Exists", 400));
      }
      user = await User.create({
        name,
        email,
        password,
        avatar,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
