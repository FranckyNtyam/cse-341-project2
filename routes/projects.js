const projectRouter = require('express').Router();
const projectController = require('../controllers/projectController')
const validation = require('../utilities/validator')
const {isAuthenticated} = require('../utilities/authenticate')

projectRouter.get('/',isAuthenticated, projectController.getAllProject)
projectRouter.post('/',isAuthenticated, validation.projectValidationRules(), validation.projectCheckData, projectController.CreateProject)
projectRouter.put('/:id',isAuthenticated, validation.projectValidationRules(), validation.projectCheckData, projectController.updateProject)
projectRouter.delete('/:id',isAuthenticated, projectController.deleteProject)


module.exports = projectRouter;