module.exports.reserror = function (res, error) {
    res.status(400).send({
        "statuscode": "400",
        "message": error.message,
        "result": null
    })
}

module.exports.ressuccess = function (res, result) {
    res.status(200).send({
        "statuscode": "200",
        "message": "success",
        "result": result
    })
}