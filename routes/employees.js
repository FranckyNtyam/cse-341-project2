const employeeRouter = require('express').Router();
const employeeController = require('../controllers/employeeController')
const {inputValidationRules, checkData} = require('../utilities/validator')

employeeRouter.get('/', employeeController.getAllEmployee)
employeeRouter.post('/', inputValidationRules(), checkData, employeeController.CreateEmployee)
employeeRouter.put('/:id',inputValidationRules(), checkData, employeeController.updateEmployee)
employeeRouter.delete('/:id', employeeController.deleteEmployee)


module.exports = employeeRouter;