const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 3000

const util = require('./util')

// load db
const path = require("path")
var Datastore = require('nedb');
let db = {}
db.users = new Datastore({ filename: path.join(__dirname, "/db/users"), autoload: true });
db.mcq = new Datastore({ filename: path.join(__dirname, "/db/mcq"), autoload: true });
db.diagnosis = new Datastore({ filename: path.join(__dirname, "/db/diagnosis"), autoload: true });

app.get('/', (req, res) => {
    db.users.insert({
        "id": "1",
        "name": "pavan",
        "email": "pavan@masterji.ai",
        "mobile": "8147317832",
        "password": "password",
        "token": "wqer1234asdfeqrwe2345",
        "is_active": true
    }, function (err, newuser) {
        if (err) {
            res.send(err)
        } else {
            res.json(newuser)
        }
    })
})

/////////////////////////////////////
// users apis
app.get('/api/v1/users', function (req, res) {
    try {
        console.log(req.query);
        db.users.find(req.query, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/api/v1/users/:id', function (req, res) {
    try {
        db.users.find({ id: req.params.id }, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.post('/api/v1/users', function (req, res) {
    try {
        db.users.insert(req.body, function (err, users) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, users)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.put('/api/v1/users/:id', function (req, res) {
    try {
        db.users.update({ id: req.params.id }, req.body, {}, function (err, users) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, users)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.delete('/api/v1/users/:id', function (req, res) {
    try {
        db.users.update({ id: req.params.id }, { multi: false }, function (err, users) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, users)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
/////////////////////////////////////

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})