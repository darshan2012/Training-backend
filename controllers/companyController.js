const Companies = require("../models/companyModel");

const safe = require("../utils/safe");
const response = require("../utils/response");


exports.getCompanies = safe(async (req,res) => {
    const {state, district} = req.query;
    let query={};
    if(state)
        query["state"] = state;
    if(district)query["district"] = district;
    const companies = await Companies.find(query).populate('district state')
    response.successResponse(res,companies)
});

exports.addCompanies = safe(async (req,res) => {

});

exports.updateCompanies = safe(async (req,res) => {

});

exports.deleteCompanies = safe(async (req,res) => {

});

exports.getCompany = safe(async (req,res) => {

});

exports.addCompany = safe(async (req,res) => {
    const {companyname,state,district} = req.body; 
    const company = new Companies({
        companyname,
        state,
        district
    })
    await company.save();
    response.successfullyCreatedResponse(res,company);
});

exports.updateCompany = safe(async (req,res) => {

});

exports.deleteCompany = safe(async (req,res) => {

});