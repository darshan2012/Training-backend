var express = require("express");
var router = express.Router();

const projectController = require('../controllers/projectController')

router.route('/')
.get(projectController.getProjects)
.post(projectController.addProject)

router.route('/:projectid/module')
.get(projectController.getModules)
.post(projectController.addModule)

router.route('/:projectid/module/:moduleid')
.get(projectController.getTasks)
.post(projectController.addTask)

router.get('/analysis',projectController.getAnalysis)

router.get('/getDataWithHours',projectController.getDataWithHours)

module.exports = router;
