var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
// const {PythonShell} = require('python-shell');
// const pythonScriptPath = "./pp.py";
const { fs } = require("fs");
const safe = require("../utils/safe");
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

const filter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);
  else {
    cb(new Error("Error: Images Only!", 400), false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 30 * 1000000,
  },
  fileFilter: filter,

  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname).toLowerCase();
  //   console.log(ext);
  //   console.log(file);

  //   if (ext !== ".png" || ext !== ".jpg" || ext !== ".jpeg" || ext !== ".gif") {
  //     // if (file.mimetype.startsWith("image")) {
  //     const err = new Error();
  //     err.message = "Only images are allowed";
  //     err.status = 400;
  //     cb(new Error(err), false);
  //   }
  //   cb(null, true);
  // },
});

router.get("/", imageController.getImage);
router.post(
  "/upload",
  upload.single("profilePicture"),
  imageController.uploadImage
);
router.delete("/", imageController.deleteImage);

module.exports = router;
