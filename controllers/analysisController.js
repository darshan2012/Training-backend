const Companies = require("../models/companyModel");
const Users = require("../models/userModel");
const States = require("../models/stateModel");
const Districts = require("../models/districtModel");
const mongoose = require("mongoose");

const safe = require("../utils/safe");
const response = require("../utils/response");

exports.getHoursByCompany = safe(async (req, res) => {
  const { state, district, month } = req.query;
  let pipelines = [];
  if (state || district) {
    let pipeline = {
      $match: {},
    };
    if(state) {
      pipeline.$match["state"] = new mongoose.Types.ObjectId(state);
      if(district) pipeline.$match["district"] = new mongoose.Types.ObjectId(
        district);
    }
    pipelines.push(pipeline);
  }
  pipelines.push({
    $unwind: {
      path: "$workDetails",
    },
  });
  
  if (month) {
    pipelines.push({
      $match : {
        "workDetails.month" : month
      }
    });
  }
  //push month filter to the pipeline
  pipelines.push(
    {
      $group: {
        _id: "$company",
        hours: {
          $sum: "$workDetails.hours",
        },
      },
    },
    {
      $lookup: {
        from: "companies",
        localField: "_id",
        foreignField: "_id",
        as: "company",
      },
    },
    {
      $addFields: {
        company: {
          $arrayElemAt: ["$company", 0],
        },
      },
    }
  );
  //   console.log(pipeline);
  // return response.successResponse(res,pipelines)
  const data = await Users.aggregate(pipelines);
  response.successResponse(res, data, "Total Working hours per company");
});

//Query if the database in normalized we have to lookup and then filter by the states and districts
// exports.getHoursByCompany = safe(async (req, res) => {
//   const { state, district, month } = req.query;
//   let pipelines = [];
//   if (month) {
//     pipelines.push({
//       $match: {
//         "workDetails.month": month,
//       },
//     });
//   }
//   pipelines.push({
//     $unwind: {
//       path: "$workDetails",
//     },
//   });
//   //push month filter to the pipeline

//   pipelines.push(
//     {
//       $group: {
//         _id: "$company",
//         hours: {
//           $sum: "$workDetails.hours",
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: "companies",
//         localField: "_id",
//         foreignField: "_id",
//         as: "company",
//       },
//     },
//     {
//       $addFields: {
//         company: {
//           $arrayElemAt: ["$company", 0],
//         },
//       },
//     }
//   );
//   if (state) {
//     let pipeline = {
//       $match: {
//         "company.state": new mongoose.Types.ObjectId(state),
//       },
//     };
//     if (district) {
//       pipeline.$match["company.district"] = new mongoose.Types.ObjectId(
//         district
//       );
//     }
//     pipelines.push(pipeline);
//   }
//   //   console.log(pipeline);
//     // return response.successResponse(res,pipelines)
//   const data = await Users.aggregate(pipelines);
//   // const chartData = {
//   //   labels: data.map(record => record.company.companyname),
//   //   datasets: [
//   //     {
//   //       label: "Total Working Hours",
//   //       data: data.map(record => record.hours),
//   //       backgroundColor: "rgba(75, 192, 192, 0.2)",
//   //       borderColor: "rgba(75, 192, 192, 1)",
//   //       borderWidth: 1,
//   //     },
//   //   ],
//   // };

//   // for (const record of data) {
//   //   chartData.labels.push(record.company.companyname);
//   //   chartData.datasets[0].data.push(record.hours);
//   // }

//   response.successResponse(res, data, "Total Working hours per company");
// });
