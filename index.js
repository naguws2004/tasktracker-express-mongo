const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config.json')
const cron = require('./service/cronService')
const taskRouter = require('./routes/taskRoutes')
const app = express()

mongoose.connect(config.connString, {useNewUrlParser:true})
const con = mongoose.connection

con.on("open", () => {
    console.log("connected...")
})

app.use(express.json())
app.use(cors())
app.use('/api/tasks', taskRouter)

const PORT = process.env.PORT || 200
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}...`))