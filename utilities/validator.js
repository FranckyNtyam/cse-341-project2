const {body, validationResult} = require('express-validator')



/************************
 * Data validation rules for Employees
 ************************* */
const employeeValidationRules = () => {
    return [
        body('full_name').trim().escape().notEmpty().isLength({min:1}).withMessage("Please provide full name"),
        body('department').trim().escape().notEmpty().isLength({min:1}).withMessage("Please provide the name of department"),
        body('position').trim().escape().notEmpty().isLength({min:1}).withMessage("Please provide your position"),
        body('hire_date').trim().notEmpty().isDate().withMessage("Must be a valid date"),
        body('salary').trim().notEmpty().isInt({min:0}).withMessage("Salary is required and cannot be negative number."),
        body('manager').trim().notEmpty().isLength({min: 1}).withMessage("Please provide the name of your manager."),
        body('projects').toArray(),
        body('skills').trim().toArray(),
    ]
}
 /******************************************
  * Check data and return errors or continue for Employees
  ****************************************** */
 const employeeCheckData = async (req, res, next) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array().map(err =>  err.msg)})
    }
    if(errors.isEmpty()){
        next()
    }
    
 }

 /************************
 * Data validation rules for Projects
 ************************* */
const projectValidationRules = () => {
    return [
        body('name').trim().escape().notEmpty().isLength({min:1}).withMessage("Please provide name of project"),
        body('description').trim().escape().notEmpty().isLength({min:1}).withMessage("Please provide the description of project"),
        body('start_date').trim().escape().notEmpty().isDate().withMessage("Please provide the valid start date of project"),
        body('end_date').trim().notEmpty().isDate().withMessage("Please provide the valid end date of project"),
        body('team_lead').trim().notEmpty().isInt({min:0}).withMessage("team lead is required and cannot be negative number."),
        body('members').trim().notEmpty().toArray().withMessage("Please provide members of project."),
        body('status').trim().notEmpty().withMessage("Provide the status of project"),
    ]
}
 /******************************************
  * Check data and return errors or continue
  ****************************************** */
 const projectCheckData = async (req, res, next) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array().map(err =>  err.msg)})
    }
    if(errors.isEmpty()){
        next()
    }
    
 }

 module.exports = {employeeValidationRules, employeeCheckData, projectValidationRules, projectCheckData}