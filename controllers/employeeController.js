const mongodb = require('../models/database')
const ObjectId = require('mongodb').ObjectId

const getAllEmployee = async (req, res) => {
    const dataResult = await mongodb.getDb().db().collection('employees').find().toArray().then((employees) => {
        res.setHeader('content-type', 'application/json')
        res.status(200).json(employees)
    })
}

const CreateEmployee = async (req, res) => {
    const employee = {
        full_name: req.body.full_name,
        department: req.body.department,
        position: req.body.position,
        hire_date: req.body.hire_date,
        salary: req.body.salary,
        manager: req.body.manager,
        projects: req.body.projects,
        skills: req.body.skills
    }
    const dataResult = await mongodb.getDb().db().collection('employees').insertOne(employee)
    if(dataResult.acknowledged){
        res.status(201).send()
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while create the employee.')
    }
}

const updateEmployee = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id employee to update an employee.')
    }
    const employee_id = new ObjectId(req.params.id)
    const employee = {
        full_name: req.body.full_name,
        department: req.body.department,
        position: req.body.position,
        hire_date: req.body.hire_date,
        salary: req.body.salary,
        manager: req.body.manager,
        projects: req.body.projects,
        skills: req.body.skills
    }
    
    const dataResult = await mongodb.getDb().db().collection('employees').replaceOne({_id: employee_id}, employee, {runValidators: true})
    
    if(dataResult.modifiedCount === 0){
        res.status(404).json({status:'fail',
        msg: 'No employee with ID ' +employee_id+' is found to update.'})
    }
    if(dataResult.modifiedCount > 0){
        res.status(204).json('Employee updated')
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while update the employee.')
    }
}

const deleteEmployee = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id employee to delete an employee.')
    }

    const employee_id = new ObjectId(req.params.id)
    
    const dataResult = await mongodb.getDb().db().collection('employees').deleteOne({_id: employee_id}, true)
   
    if(dataResult.deletedCount === 0 & dataResult.acknowledged === true){
        return res.status(404).json({
            status:'fail',
            msg:'No employee with ID ' +employee_id+' is found to delete.'
        })
       
    } else if(dataResult.deletedCount > 0 & dataResult.acknowledged === true){
       return res.status(204).json({status:"success"})
    }
    else{
        res.status(500).json(dataResult.error || 'Some error occured while delete the employee.')
    }
}


module.exports = {getAllEmployee, CreateEmployee, updateEmployee, deleteEmployee}