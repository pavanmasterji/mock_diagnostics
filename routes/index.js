const express = require('express')
let app = express()

app.use('/users', require('./users'))

module.exports = app