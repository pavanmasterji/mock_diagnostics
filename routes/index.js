const express = require('express')
let app = express()

app.use('/users', require('./users'))
app.use('/mcq', require('./mcq'))


module.exports = app