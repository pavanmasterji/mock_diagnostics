const express = require('express')
let app = express()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.topics = new Datastore({ filename: path.join(__dirname, "../db/topics"), autoload: true });

const util = require('../util')


app.get('/', function (req, res) {
    try {
        db.topics.find(req.query, function (err, topics) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, topics)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:id', function (req, res) {
    try {
        db.topics.find({ id: req.params.id }, function (err, topics) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, topics)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.post('/', function (req, res) {
    try {
        let addtopicsObj = {
            "id":req.body.id,
            "board_id":req.body.board_id,
            "standard_code":req.body.standard_code,
            "subject_code":req.body.subject_code,
            "chapter_id":req.body.chapter_id,
            "topic_list":req.body.topic_list
        }
        
        db.topics.insert(addtopicsObj, function (err, topics) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, topics)
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
            "subject_code":req.body.subject_code,
            "chapter_id":req.body.chapter_id,
            "topic_list":req.body.topic_list
        }

        db.topics.update({ id: req.params.id }, updateStandard, {}, function (err, topics) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, topics)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.delete('/:id', function (req, res) {
    try {
        db.topics.update({ id: req.params.id }, { multi: false }, function (err, topics) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, topics)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

module.exports = app