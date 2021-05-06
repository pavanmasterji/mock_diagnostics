const express = require('express')
let app = express()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.chapters = new Datastore({ filename: path.join(__dirname, "../db/chapters"), autoload: true });

const util = require('../util')


app.get('/', function (req, res) {
    try {
        db.chapters.find(req.query, function (err, chapters) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, chapters)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:id', function (req, res) {
    try {
        db.chapters.find({ id: req.params.id }, function (err, chapters) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, chapters)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.post('/', function (req, res) {
    try {
        let addchaptersObj = {
            "id":req.body.id,
            "board_id":req.body.board_id,
            "standard_code":req.body.standard_code,
            "subject_code":req.body.subject_code,
            "chapter_list":req.body.chapter_list
        }
        
        db.chapters.insert(addchaptersObj, function (err, chapters) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, chapters)
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
            "chapter_list":req.body.chapter_list
        }

        db.chapters.update({ id: req.params.id }, updateStandard, {}, function (err, chapters) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, chapters)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.delete('/:id', function (req, res) {
    try {
        db.chapters.update({ id: req.params.id }, { multi: false }, function (err, chapters) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, chapters)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

module.exports = app