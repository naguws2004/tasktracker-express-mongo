const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    TaskId:{
        type: Number,
        required: true
    },
    EmailId: {
        type: String,
        required: true
    },
    TaskName: {
        type: String,
        required: true
    },
    TaskDateTime: {
        type: Date,
        required: true
    },
    Remind: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('taskModel', taskSchema, 'tasks')