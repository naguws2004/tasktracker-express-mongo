const express = require('express')
const taskRouter = express.Router()
const taskModel = require('../models/taskModel')
const emailService = require('../service/emailService')

taskRouter.get('/', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const tasks = await taskModel.find()
        res.json(tasks)
    } catch(err) {
        res.json('Error ' + err)
    }
})

taskRouter.get('/:emailId', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const tasks = await taskModel.find({ EmailId: req.params.emailId })
        res.json(tasks)
    } catch(err) {
        console.log(err)
        res.json('Error ' + err)
    }
})

taskRouter.post('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    taskModel.findOne().sort('-TaskId').exec(async(err, item) => {

        const newTaskId = item === null ? 1 : item.TaskId + 1

        const newTask = new taskModel({
            TaskId: newTaskId,
            EmailId: req.body.EmailId,
            TaskName: req.body.TaskName,
            TaskDateTime: req.body.TaskDateTime,
            Remind: req.body.Remind
        })

        try {
            const savedTask = await newTask.save()

            const emailId = savedTask.EmailId
            const subject = "New Task added to your Task Tracker"
            const text = "<strong>Task Name: '" + savedTask.TaskName + "'</strong>"
            console.log('Sending email...')
            emailService(emailId, subject, text)
            console.log('Email sent')

            res.json(savedTask)
        } catch (err) {
            console.log(err)
            res.json('Error ' + err)
        }
    })
})

taskRouter.put('/:Id', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const modifiedTask = await taskModel.findOne({ TaskId: req.params.Id })
        modifiedTask.Remind = !modifiedTask.Remind
        const savedTask = await modifiedTask.save()
        res.json(savedTask)
    } catch (err) {
        console.log(err)
        res.json('Error ' + err)
    }
})

taskRouter.delete('/:Id', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const deletedTask = await taskModel.findOneAndDelete({ TaskId: req.params.Id })
        res.json(deletedTask)
    } catch (err) {
        console.log(err)
        res.json('Error ' + err)
    }
})

taskRouter.post('/UpdateTasks', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json('')
})

module.exports = taskRouter