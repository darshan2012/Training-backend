var express = require("express");
var router = express.Router();

const districtController = require('../controllers/districtController');

router.route('/')
.get(districtController.getDistricts)
.post(districtController.addDistricts)
.delete(districtController.deleteDistricts)

router.route('/:districtid')
.get(districtController.getDistrict)
.put(districtController.updateDistrict)
.delete(districtController.deleteDistrict)

router.get('/get-districts-by-state/:stateid/',districtController.getDistrictsByStates)
module.exports = router;