const States = require("../models/stateModel");
const Districts = require("../models/districtModel");

const safe = require("../utils/safe");
const response = require("../utils/response");

const fs = require("fs");

exports.addStatesWDistricts = safe(async (req, res) => {
  const jsonData = JSON.parse(
    fs.readFileSync(
      "C:/Users/darsh/Downloads/Indian_Cities_In_States_JSON.json",
      "utf8"
    )
  );

  for (const [stateName, cities] of Object.entries(jsonData)) {
    // Create or find the state
    const state = await States.findOneAndUpdate(
      { statename: stateName },
      { statename: stateName },
      { upsert: true, new: true }
    );

    // Create districts for each city
    for (const cityName of cities) {
      await Districts.create({
        districtname: cityName,
        state: state._id,
      });
    }
  }

  response.successResponse(res, jsonData);
});

exports.getStates = safe(async (req, res) => {
  const states = await States.find({});
  response.successResponse(res, states);
});

exports.addStates = safe(async (req, res) => {});

exports.updateStates = safe(async (req, res) => {});

exports.deleteStates = safe(async (req, res) => {});

exports.getState = safe(async (req, res) => {
  const states = await States.findById(req.params.id);
  response.successResponse(res, states);
});

exports.addState = safe(async (req, res) => {});

exports.updateState = safe(async (req, res) => {});

exports.deleteState = safe(async (req, res) => {});
