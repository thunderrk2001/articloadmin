const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const model = require("../models/adminSchema")
router.post("/signInApi", async(req, res) => {
    try {
        const userName = req.body.userName
        const password = req.body.password
        if (userName == undefined || password == undefined)
            throw "field cant be empty"
        const findModel = await model.findOne({ userName: userName })
        if (findModel == null) {
            throw "User Name not exist"
        } else {
            if (findModel.password != password)
                throw "password not matched"
            else {
                var token = await jwt.sign(findModel.userName + findModel.password, process.env.bcryptHash)
                res.status(200).cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict"
                })
                res.status(200).send({ "message": "success" })
            }
        }
    } catch (e) {

        res.status(400).send({ "message": e })

    }
})
module.exports = router