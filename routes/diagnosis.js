const express = require('express')
let app = express()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.diagnosis = new Datastore({ filename: path.join(__dirname, "../db/diagnosis"), autoload: true });

const util = require('../util')


app.get('/', function (req, res) {
    try {
        db.diagnosis.find(req.query, function (err, diagnosis) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, diagnosis)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:id', function (req, res) {
    try {
        db.diagnosis.find({ id: req.params.id }, function (err, diagnosis) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, diagnosis)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.post('/', function (req, res) {
    try {
        let addDiagnosisObj = {
            "id":req.body.id,
            "user_id":req.body.user_id,
            "previous_percentage":req.body.previous_percentage,
            "required_percentage":req.body.required_percentage,
            "competency":req.body.competency
        }
        
        db.diagnosis.insert(addDiagnosisObj, function (err, diagnosis) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, diagnosis)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.put('/:id', function (req, res) {
    try {
        let updateDiagnosisObj = {
            "id":req.params.id,
            "user_id":req.body.user_id,
            "previous_percentage":req.body.previous_percentage,
            "required_percentage":req.body.required_percentage,
            "competency":req.body.competency
        }

        db.diagnosis.update({ id: req.params.id }, updateDiagnosisObj, {}, function (err, diagnosis) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, diagnosis)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.delete('/:id', function (req, res) {
    try {
        db.diagnosis.update({ id: req.params.id }, { multi: false }, function (err, diagnosis) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, diagnosis)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

module.exports = app