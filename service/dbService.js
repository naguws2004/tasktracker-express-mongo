const mongoose = require('mongoose')
const AESCrypt = require('./cryptoService')
const constants = require('../constants.json')

const connKey = constants.DB_CONNECTION_STRING
const connString = AESCrypt.decrypt(connKey)

mongoose.connect(connString, {useNewUrlParser:true})
const con = mongoose.connection

con.on("open", () => {
    console.log("connected...")
})

