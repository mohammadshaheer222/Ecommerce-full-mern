const express = require("express");
const ErrorHandler = require("./Middleware/Error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", express.static("uploads")); //root folder, fotos kerna folder, syntax ingnen
app.use(bodyParser.urlencoded({ extended: true })); //extended: true means requestil ninn nested objectsine edkaan vendiyaan extended true use cheyyunnath

//routes
const user = require("./Controllers/UserController");
app.use("/api/v2", user);

//for error handling
app.use(ErrorHandler);

module.exports = app;
