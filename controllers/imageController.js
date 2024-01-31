
const safe = require("../utils/safe");

const { removeFile } = require("../utils/removeFile");
const Images = require("../models/imageModel");
const response = require("../utils/response");
const { spawn } = require("child_process"); 
const path = require("path");
// const {PythonShell} = require('python-shell');



// const pythonScriptPath = "./pp.py";
const { fs } = require("fs");

exports.uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const ext = path.extname(req.file.originalname);
      // console.log(req.file.originalname)
      const pythonScriptPath = "./public/pp.py";
      const pythonScriptArgs = [req.file.destination, req.file.filename, ext];
  
      const pythonProcess = spawn("python", [
        pythonScriptPath,
        ...pythonScriptArgs,
      ]);
      let scriptOutput = "";
  
      pythonProcess.stdout.on("data", (data) => {
        scriptOutput += data.toString();
      });
  
      pythonProcess.stderr.on("data", (data) => {
        console.error(`Error in Python script: ${data}`);
        return res.status(500).json({ error: "Internal server error" });
      });
      
      pythonProcess.on("close", async (code) => {
        if (code == 0) {
          await Images.create({
            imageBase64: scriptOutput,
            ext: ext,
            type: req.file.mimetype,
          });
          // console.log(req.file)
          removeFile(req.file.path);
          return res.status(200).json({ output: scriptOutput });
        } else {
          console.error(`Python script exited with code ${code}`);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
    } catch (error) {
      removeFile(req.file.path);
      console.error("Error in file upload:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  exports.getImage = safe(async (req, res) => {
    const image = await Images.aggregate([
      {
        $sample: {
          size: 1,
        },
      },
    ]);
    // console.log(image);
    response.successResponse(res, image);
  })

  exports.deleteImage = safe(async (req, res) => {
    try {
      const resObj = await Images.deleteMany({});
      response.successResponse(res, resObj, "All Images Deleted Successfully");
    } catch (error) {
      response.serverErrorResponse(res, error, "Error in deleting the images");
    }
  })