const Districts = require("../models/districtModel");
const States = require("../models/stateModel")

const safe = require("../utils/safe");
const response = require("../utils/response");



exports.getDistricts = safe(async (req, res) => {
  const districts = await Districts.find({}).populate({
    path: 'state',
    select: "statename"
});
  response.successResponse(res, districts);
});

exports.getDistrictsByStates = safe(async (req,res) => {
  const districts = await Districts.find({state: req.params.stateid}).sort({lenght:1,districtname:1})
  response.successResponse(res,districts)
})

exports.addDistricts = safe(async (req, res) => {});

exports.updateDistricts = safe(async (req, res) => {});

exports.deleteDistricts = safe(async (req, res) => {});

exports.getDistrict = safe(async (req, res) => {});

exports.addDistrict = safe(async (req, res) => {});

exports.updateDistrict = safe(async (req, res) => {});

exports.deleteDistrict = safe(async (req, res) => {});
