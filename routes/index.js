const express = require('express')
let app = express()

app.use('/users', require('./users'))
app.use('/mcq', require('./mcq'))
app.use('/diagnosis', require('./diagnosis'))
app.use('/boards', require('./boards'))
app.use('/standards', require('./standards'))


module.exports = app