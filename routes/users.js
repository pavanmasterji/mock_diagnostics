const express = require('express')
let app = express()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.users = new Datastore({ filename: path.join(__dirname, "../db/users"), autoload: true });

const util = require('../util')

app.get('/:id', function (req, res) {
    try {
        db.users.find({ id: req.params.id }, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:email&:password', function (req, res) {
    try {
        db.users.find({ email: req.params.email,password: req.params.password }, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:mobile', function (req, res) {
    try {
        db.users.find({ mobile: req.params.mobile}, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/', function (req, res) {
    try {
        db.users.find(req.query, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:id', function (req, res) {
    try {
        db.users.find({ id: req.params.id }, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:email&:password', function (req, res) {
    try {
        db.users.find({ email: req.params.email,password: req.params.password }, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:mobile', function (req, res) {
    try {
        db.users.find({ mobile: req.params.mobile}, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.post('/', function (req, res) {
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
app.put('/:id', function (req, res) {
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
app.delete('/:id', function (req, res) {
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

module.exports = app