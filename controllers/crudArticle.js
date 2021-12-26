const express = require("express")
const router = express.Router()
const validator = require("../middlewares/validator")
const userArticleModel = require("../models/userArticles")
const pendingModel = require("../models/articlesModel")
const rejectModel = require("../models/rejectArticle")
router.get("/preview/:id/addToUserArticle", validator, async(req, res) => {
    var id = req.params.id
    const json_res = await pendingModel.findById(id)
    if (json_res == null) {
        res.status(400).send({ "message": "error" })
    } else {
        var json_data = {
            "title": json_res.title,
            "article": json_res.article,
            "userId": json_res.userId,
            "dateTime": json_res.dateTime,
            "userName": json_res.userName,
            "unixTime": json_res.unixTime
        }
        await userArticleModel(json_data).save()
        res.status(200).send({ "message": "ok" })
        await pendingModel.findByIdAndDelete(id)
    }



})
router.post("/preview/:id/addToRejectArticle", validator, async(req, res) => {
    var mess = req.body.message
    var id = req.params.id
    const json_res = await pendingModel.findById(id)
    if (json_res == null) {
        console.log("null")
    } else {
        var json_data = {
            "title": json_res.title,
            "article": json_res.article,
            "userId": json_res.userId,
            "dateTime": json_res.dateTime,
            "userName": json_res.userName,
            "message": mess,
            "unixTime": json_res.unixTime,
            "isForUpdate": false,

        }

        await rejectModel(json_data).save()
        res.status(200).send({ "messsage": "Sucess rejected" })
        await pendingModel.findByIdAndDelete(id)

    }
})
router.get("/preview/:id/addToUpdateUserArticle", validator, async(req, res) => {
    var id = req.params.id
    const json_res = await pendingModel.findById(id)
    if (json_res == null) {
        res.status(400).send({ "message": "error" })
    } else {
        var json_data = {
            "title": json_res.title,
            "article": json_res.article,
            "userId": json_res.userId,
            "dateTime": json_res.dateTime,
            "userName": json_res.userName,
            "unixTime": json_res.unixTime,
        }
        await userArticleModel.findByIdAndUpdate(json_res.uid, json_data, { new: true })
        res.status(200).send({ "message": "ok" })
        await pendingModel.findByIdAndDelete(id)
    }


})
router.post("/preview/:id/addToUpdateRejectArticle", validator, async(req, res) => {
    var mess = req.body.message
    var id = req.params.id
    const json_res = await pendingModel.findById(id)
    if (json_res == null) {
        console.log("null")
    } else {
        var json_data = {
            "title": json_res.title,
            "article": json_res.article,
            "userId": json_res.userId,
            "dateTime": json_res.dateTime,
            "userName": json_res.userName,
            "message": mess,
            "unixTime": json_res.unixTime,
            "isForUpdate": true,
            "uid": json_res.uid

        }
        await rejectModel(json_data).save()
        res.status(200).send({ "messsage": "Sucess rejected" })
        await pendingModel.findByIdAndDelete(id)
    }
})
module.exports = router