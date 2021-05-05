const express = require('express')
let app = express()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.mcq = new Datastore({ filename: path.join(__dirname, "../db/mcq"), autoload: true });

const util = require('../util')


app.get('/', function (req, res) {
    try {
        db.mcq.find(req.query, function (err, mcq) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, mcq)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:id', function (req, res) {
    try {
        db.mcq.find({ id: req.params.id }, function (err, mcq) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, mcq)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.post('/', function (req, res) {
    try {
        let requiredMcqObj = {
            "id":req.body.id,
            "question":req.body.question,
            "option_1":req.body.option_1,
            "option_2":req.body.option_2,
            "option_3":req.body.option_3,
            "option_4":req.body.option_4,
            "competency":req.body.competency,
            "active":req.body.active,
            "correct_answer":req.body.correct_answer
        }
        db.mcq.insert(requiredMcqObj, function (err, mcq) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, mcq)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.put('/:id', function (req, res) {
    try {
        let updateMcqObj = {
            "id":req.params.id,
            "question":req.body.question,
            "option_1":req.body.option_1,
            "option_2":req.body.option_2,
            "option_3":req.body.option_3,
            "option_4":req.body.option_4,
            "competency":req.body.competency,
            "active":req.body.active,
            "correct_answer":req.body.correct_answer
        }
        db.mcq.update({ id: req.params.id }, updateMcqObj, {}, function (err, mcq) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, mcq)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.delete('/:id', function (req, res) {
    try {
        db.mcq.update({ id: req.params.id }, { multi: false }, function (err, mcq) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, mcq)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

module.exports = app