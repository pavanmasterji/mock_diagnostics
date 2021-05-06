const express = require('express')
let app = express()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.subjects = new Datastore({ filename: path.join(__dirname, "../db/subjects"), autoload: true });

const util = require('../util')


app.get('/', function (req, res) {
    try {
        db.subjects.find(req.query, function (err, subjects) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, subjects)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:id', function (req, res) {
    try {
        db.subjects.find({ id: req.params.id }, function (err, subjects) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, subjects)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.post('/', function (req, res) {
    try {
        let addsubjectsObj = {
            "id":req.body.id,
            "board_id":req.body.board_id,
            "standard_code":req.body.standard_code,
            "subject_list":req.body.subject_list
        }
        
        db.subjects.insert(addsubjectsObj, function (err, subjects) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, subjects)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.put('/:id', function (req, res) {
    try {
        let updateStandard = {
            "id":req.params.id,
            "board_id":req.body.board_id,
            "standard_code":req.body.standard_code,
            "subject_list":req.body.subject_list
        }

        db.subjects.update({ id: req.params.id }, updateStandard, {}, function (err, subjects) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, subjects)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.delete('/:id', function (req, res) {
    try {
        db.subjects.update({ id: req.params.id }, { multi: false }, function (err, subjects) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, subjects)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

module.exports = app