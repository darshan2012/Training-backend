const Projects = require("../models/projectModel");

const safe = require("../utils/safe");
const response = require("../utils/response");
const { default: mongoose } = require("mongoose");

exports.getProjects = safe(async (req, res) => {
  const projects = await Projects.find({});
  response.successResponse(res, projects);
});
exports.addProject = safe(async (req, res) => {
  const { name } = req.body;
  const project = new Projects({
    name,
  });
  await project.save();
  response.successfullyCreatedResponse(
    res,
    project,
    "Project added successfully!!"
  );
});

exports.getModules = safe(async (req, res) => {
  const modules = await Projects.findById(req.params.projectid, { modules: 1 });
  response.successResponse(res, modules);
});
exports.addModule = safe(async (req, res) => {
  const { name } = req.body;
  const project = await Projects.findByIdAndUpdate(
    req.params.projectid,
    {
      $push: {
        modules: { moduleName: name },
      },
    },
    { new: true, projection: { modules: 1 } }
  );
  response.successResponse(res, project);
});

exports.getTasks = safe(async (req, res) => {
  const tasks = await Projects.findById(req.params.projectid);
  response.successResponse(res, tasks);
});
exports.addTask = safe(async (req, res) => {
  const { taskName, date, research, development, meeting } = req.body;
  const task = {
    taskName,
    date,
    research,
    development,
    meeting,
  };
  if (date) task.date = date;
  const project = await Projects.findOneAndUpdate(
    { _id: req.params.projectid, "modules._id": req.params.moduleid },
    {
      $push: { "modules.$.tasks": task },
    },
    {
      new: true,
    }
  );
  response.successfullyCreatedResponse(res, project, "task added!!");
});

exports.getAnalysis = safe(async (req, res) => {
  const { startDate, endDate, project, module } = req.query;
  const pipelines = [];
  if (project) {
    pipelines.push({
      $match: {
        _id: new mongoose.Types.ObjectId(project),
      },
    });
  }
  pipelines.push({
    $unwind: {
      path: "$modules",
    },
  });
  if (module) {
    pipelines.push({
      $match: {
        "modules._id": new mongoose.Types.ObjectId(module),
      },
    });
  }
  pipelines.push({
    $unwind: {
      path: "$modules.tasks",
    },
  });
  // console.log(data);
  if (startDate || endDate) {
    console.log(startDate, endDate);
    if (!startDate) startDate = endDate;
    if (!endDate) endDate = startDate;
    pipelines.push({
      $match: {
        "modules.tasks.date": {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    });
  }
  pipelines.push({
    $group: {
      _id: null,
      totalResearch: {
        $sum: "$modules.tasks.research",
      },
      totalDevelopment: {
        $sum: "$modules.tasks.development",
      },
      totalMeeting: {
        $sum: "$modules.tasks.meeting",
      },
    },
  });
  pipelines.push({
    $addFields: {
      total: {
        $add: ["$totalDevelopment", "$totalMeeting", "$totalResearch"],
      },
    },
  });
  const result = await Projects.aggregate(pipelines);

  response.successResponse(res, result);
});
