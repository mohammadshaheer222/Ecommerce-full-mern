const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];//[filename,extension]
    cb(null, filename + "_" + uniqueSuffix + ".png");
  },
});

exports.upload = multer({ storage: storage });
