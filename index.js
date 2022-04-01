const express = require('express')
const mongoose = require('mongoose')
const config = require('./config.json')
const taskRouter = require('./routes/taskRoutes')
const app = express()

mongoose.connect(config.connString, {useNewUrlParser:true})
const con = mongoose.connection

con.on("open", () => {
    console.log("connected...")
})

app.use(express.json())
app.use('/api/tasks', taskRouter)

const PORT = process.env.PORT || 200
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}...`))