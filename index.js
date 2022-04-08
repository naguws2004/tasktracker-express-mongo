const express = require('express')
const cors = require('cors')
const db = require('./service/dbService')
const cron = require('./service/cronService')
const taskRouter = require('./routes/taskRoutes')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/tasks', taskRouter)

const PORT = process.env.PORT || 200
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}...`))