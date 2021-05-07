const express = require('express')
let app = express()

app.use('/users', require('./users'))
app.use('/mcq', require('./mcq'))
app.use('/diagnosis', require('./diagnosis'))
app.use('/boards', require('./boards'))
app.use('/standards', require('./standards'))
app.use('/subjects', require('./subjects'))
app.use('/chapters', require('./chapters'))
app.use('/topics', require('./topics'))


module.exports = app