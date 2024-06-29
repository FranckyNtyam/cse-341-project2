const employeeRouter = require('express').Router();
const employeeController = require('../controllers/employeeController')

employeeRouter.get('/', employeeController.getAllEmployee)
employeeRouter.post('/', employeeController.CreateEmployee)


module.exports = employeeRouter;