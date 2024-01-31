var express = require("express");
var router = express.Router();

const stateController = require('../controllers/stateController');

router.route('/')
.get(stateController.getStates)
.post(stateController.addStates)
.delete(stateController.deleteStates)

router.get("/statesWdistricts",stateController.addStatesWDistricts)

router.route('/:stateid')
.get(stateController.getState)
.put(stateController.updateState)
.delete(stateController.deleteState)


module.exports = router;