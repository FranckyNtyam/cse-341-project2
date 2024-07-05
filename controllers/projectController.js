const mongodb = require('../models/database')
const ObjectId = require('mongodb').ObjectId

const getAllProject = async (req, res) => {
    const dataResult = await mongodb.getDb().db().collection('projects').find().toArray().then((projects) => {
        res.setHeader('content-type', 'application/json')
        res.status(200).json(projects)
    })
}

const CreateProject = async (req, res) => {
    const project = {
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        team_lead: req.body.team_lead,
        members: req.body.members,
        status: req.body.status,
    
    }
    const dataResult = await mongodb.getDb().db().collection('projects').insertOne(project)
    if(dataResult.acknowledged){
        res.status(201).send()
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while create the employee.')
    }
}

const updateProject = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id employee to update an project.')
    }
    const project_id = new ObjectId(req.params.id)
    const project = {
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        team_lead: req.body.team_lead,
        members: req.body.members,
        status: req.body.status,
    
    }
    
    const dataResult = await mongodb.getDb().db().collection('projects').replaceOne({_id: project_id}, project, {runValidators: true})
    
    if(dataResult.modifiedCount === 0){
        res.status(404).json({status:'fail',
        msg: 'No project with ID ' +project_id+' is found to update.'})
    }
    if(dataResult.modifiedCount > 0){
        res.status(204).json('Project updated')
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while update the project.')
    }
}

const deleteProject = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id employee to delete an project.')
    }

    const project_id = new ObjectId(req.params.id)
    
    const dataResult = await mongodb.getDb().db().collection('projects').deleteOne({_id: project_id}, true)
   
    if(dataResult.deletedCount === 0 & dataResult.acknowledged === true){
        return res.status(404).json({
            status:'fail',
            msg:'No project with ID ' +project_id+' is found to delete.'
        })
       
    } else if(dataResult.deletedCount > 0 & dataResult.acknowledged === true){
       return res.status(204).json({status:"success"})
    }
    else{
        res.status(500).json(dataResult.error || 'Some error occured while delete the project.')
    }
}


module.exports = {getAllProject, CreateProject, updateProject, deleteProject}