var express = require("express");
var router = express.Router();

const companyController = require('../controllers/companyController')

router.route('/')
.get(companyController.getCompanies)
.post(companyController.addCompany)
.delete(companyController.deleteCompanies)


router.route('/:companyid')
.get(companyController.getCompany)
.put(companyController.updateCompany)
.delete(companyController.deleteCompany)


module.exports = router;