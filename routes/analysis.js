var express = require("express");
var router = express.Router();

const analysisController = require('../controllers/analysisController')

router.get('/',analysisController.getHoursByCompany);

module.exports = router;
