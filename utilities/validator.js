const {body, validationResult} = require('express-validator')



/************************
 * Data validation rules
 ************************* */
const inputValidationRules = () => {
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
  * Check data and return errors or continue
  ****************************************** */
 const checkData = async (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array().map(err =>  err.msg)})
    }
    if(errors.isEmpty()){
        next()
    }
    
 }

 module.exports = {inputValidationRules, checkData}