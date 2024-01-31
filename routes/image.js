var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
// const {PythonShell} = require('python-shell');
// const pythonScriptPath = "./pp.py";
const { fs } = require("fs");

const imageController = require("../controllers/imageController");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/profilePictures/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 30 * 1000000,
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log(ext);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".gif") {
      return cb(new Error("Only images are allowed"), false);
    }
    return cb(null, true);
  },
});

router.get("/", imageController.getImage);
router.post(
  "/upload",
  upload.single("profilePicture"),
  imageController.uploadImage
);
router.delete("/",imageController.deleteImage);

module.exports = router;
