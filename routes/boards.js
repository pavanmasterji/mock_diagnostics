const express = require('express')
let app = express()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.boards = new Datastore({ filename: path.join(__dirname, "../db/boards"), autoload: true });

const util = require('../util')


app.get('/', function (req, res) {
    try {
        db.boards.find(req.query, function (err, boards) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, boards)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:id', function (req, res) {
    try {
        db.boards.find({ id: req.params.id }, function (err, boards) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, boards)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.post('/', function (req, res) {
    try {
        let addboardsObj = {
            "id":req.body.id,
            "board_name":req.body.board_name,
            "abbreviation":req.body.abbreviation
        }
        
        db.boards.insert(addboardsObj, function (err, boards) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, boards)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.delete('/:id', function (req, res) {
    try {
        db.boards.update({ id: req.params.id }, { multi: false }, function (err, boards) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, boards)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

module.exports = app