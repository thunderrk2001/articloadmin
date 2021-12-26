const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
var validator = (async(req, res, next) => {
    const cookie = req.cookies.token
    if (cookie == undefined || cookie == null || cookie == "") {
        next()
    } else {
        await jwt.verify(cookie, process.env.bcryptHash, async(e) => {
            if (e)
                next()
            else {
                res.status(200).redirect("/")
            }



        })
    }
})
module.exports = validator