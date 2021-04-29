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

app.get('/api/v1/users/:email&:password', function (req, res) {
    try {
        db.users.find({ email: req.params.email,password: req.params.password }, function (err, users) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, users)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})

app.get('/api/v1/users/:mobile', function (req, res) {
    try {
        db.users.find({ mobile: req.params.mobile}, function (err, users) {
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

/////////////////////////////////////
// mcq apis
app.get('/api/v1/mcq', function (req, res) {
    try {
        console.log(req.query);
        db.mcq.find(req.query, function (err, mcq) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, mcq)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/api/v1/mcq/:id', function (req, res) {
    try {
        db.mcq.find({ id: req.params.id }, function (err, mcq) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, mcq)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.post('/api/v1/mcq', function (req, res) {
    try {
        let requiredMcqObj = {
            "id":"",
            "question":"",
            "option_1":"",
            "option_2":"",
            "option_3":"",
            "option_4":"",
            "competency":"",
            "active":"",
            "correct_answer":""
        }
        requiredMcqObj.id = req.body.id;
        requiredMcqObj.question = req.body.question;
        requiredMcqObj.option_1 = req.body.option_1;
        requiredMcqObj.option_2 = req.body.option_2;
        requiredMcqObj.option_3 = req.body.option_3;
        requiredMcqObj.option_4 = req.body.option_4;
        requiredMcqObj.competency = req.body.competency;
        requiredMcqObj.active = req.body.active;
        requiredMcqObj.correct_answer = req.body.correct_answer;

        console.log(requiredMcqObj);        
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
app.put('/api/v1/mcq/:id', function (req, res) {
    try {
        let updateMcqObj = {
            "question":"",
            "option_1":"",
            "option_2":"",
            "option_3":"",
            "option_4":"",
            "competency":"",
            "active":"",
            "correct_answer":""
        }
       
        updateMcqObj.question = req.body.question;
        updateMcqObj.option_1 = req.body.option_1;
        updateMcqObj.option_2 = req.body.option_2;
        updateMcqObj.option_3 = req.body.option_3;
        updateMcqObj.option_4 = req.body.option_4;
        updateMcqObj.competency = req.body.competency;
        updateMcqObj.active = req.body.active;
        updateMcqObj.correct_answer = req.body.correct_answer;

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
app.delete('/api/v1/mcq/:id', function (req, res) {
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
/////////////////////////////////////

/////////////////////////////////////
// diagnosis apis
app.get('/api/v1/diagnosis', function (req, res) {
    try {
        console.log(req.query);
        db.diagnosis.find(req.query, function (err, diagnosis) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, diagnosis)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.get('/api/v1/diagnosis/:id', function (req, res) {
    try {
        db.diagnosis.find({ id: req.params.id }, function (err, diagnosis) {
            if (err) util.reserror(res, err)
            util.ressuccess(res, diagnosis)
        })
    } catch (error) {
        util.reserror(res, error)
    }
})
app.post('/api/v1/diagnosis', function (req, res) {
    try {
        let addDiagnosisObj = {
            "id":"",
            "user_id":"",
            "previous_percentage":"",
            "required_percentage":"",
            "competency":""
        }
        addDiagnosisObj.id = req.body.id;
        addDiagnosisObj.user_id = req.body.user_id;
        addDiagnosisObj.previous_percentage = req.body.previous_percentage;
        addDiagnosisObj.required_percentage = req.body.required_percentage;
        addDiagnosisObj.competency = req.body.competency;

       
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
app.put('/api/v1/diagnosis/:id', function (req, res) {
    try {
        let updateDiagnosisObj = {
            "user_id":"",
            "previous_percentage":"",
            "required_percentage":"",
            "competency":""
        }
       
        updateDiagnosisObj.user_id = req.body.user_id;
        updateDiagnosisObj.previous_percentage = req.body.previous_percentage;
        updateDiagnosisObj.required_percentage = req.body.required_percentage;
        updateDiagnosisObj.competency = req.body.competency;

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
app.delete('/api/v1/diagnosis/:id', function (req, res) {
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
/////////////////////////////////////

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})