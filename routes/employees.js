const employeeRouter = require('express').Router();
const employeeController = require('../controllers/employeeController')
const validation = require('../utilities/validator')
const {isAuthenticated} = require('../utilities/authenticate')

employeeRouter.get('/',isAuthenticated, employeeController.getAllEmployee)
employeeRouter.post('/',isAuthenticated, validation.employeeValidationRules(), validation.employeeCheckData, employeeController.CreateEmployee)
employeeRouter.put('/:id',isAuthenticated, validation.employeeValidationRules(), validation.employeeCheckData, employeeController.updateEmployee)
employeeRouter.delete('/:id',isAuthenticated, employeeController.deleteEmployee)


module.exports = employeeRouter;