const mongodb = require('../models/database')

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

module.exports = {getAllEmployee, CreateEmployee}