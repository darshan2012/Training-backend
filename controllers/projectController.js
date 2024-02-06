const Projects = require("../models/projectModel");

const safe = require("../utils/safe");
const response = require("../utils/response");

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
  const { moduleName } = req.body;
  const project = await Projects.findByIdAndUpdate(
    req.params.projectid,
    {
      $push: {
        modules: { moduleName },
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
  const { taskName, date, hours } = req.body;
  const task = {
    taskName,
    research,
    development,
    meeting
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
