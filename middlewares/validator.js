const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
var validator = (async(req, res, next) => {
    const cookie = req.cookies.token
    if (cookie == undefined || cookie == null) {
        res.status(200).redirect("/signIn")
    } else {
        await jwt.verify(cookie, process.env.bcryptHash, async(e) => {
            if (e)
                res.status(200).redirect("/signIn")
            else {
                next()
            }

        })
    }

})
module.exports = validator