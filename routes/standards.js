const express = require('express')
let app = express()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.standards = new Datastore({ filename: path.join(__dirname, "../db/standards"), autoload: true });

const util = require('../util')


app.get('/', function (req, res) {
    try {
        db.standards.find(req.query, function (err, standards) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, standards)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/:id', function (req, res) {
    try {
        db.standards.find({ id: req.params.id }, function (err, standards) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, standards)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.post('/', function (req, res) {
    try {
        let addstandardsObj = {
            "id":req.body.id,
            "board_id":req.body.board_id,
            "standard_code":req.body.standard_code,
            "standard_name":req.body.standard_name
        }
        
        db.standards.insert(addstandardsObj, function (err, standards) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, standards)
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
            "standard_name":req.body.standard_name
        }

        db.standards.update({ id: req.params.id }, updateStandard, {}, function (err, standards) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, standards)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.delete('/:id', function (req, res) {
    try {
        db.standards.update({ id: req.params.id }, { multi: false }, function (err, standards) {
            if (err) {
                util.reserror(res, err)
            } else {
                util.ressuccess(res, standards)
            }
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

module.exports = app