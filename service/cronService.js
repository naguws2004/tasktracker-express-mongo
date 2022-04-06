const cron = require('node-cron')
const taskModel = require('../models/taskModel')
const emailService = require('./emailService')

// Schedule tasks to be run on the server.
cron.schedule('* * * * *', async() => {

    console.log('running a task every minute');
    const tasks = await taskModel.find()

    tasks.forEach(task => {

        if (task.Remind) {

            const date = new Date()

            if (date.toDateString() === task.TaskDateTime.toDateString()) {

                if (date.getHours() === task.TaskDateTime.getHours()
                    && date.getMinutes() === task.TaskDateTime.getMinutes()) {

                    const emailId = task.EmailId
                    const subject = "Reminder from your Task Tracker"
                    const text = "<strong>This is a reminder from your Task Tracker about your task '" + task.TaskName + "'</strong>"
                    console.log('Sending email...')
                    emailService(emailId, subject, text)
                    console.log('Email sent')
                }
            }
        }
    });
})
