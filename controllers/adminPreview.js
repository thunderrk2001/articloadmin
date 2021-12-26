const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const model = require("../models/articlesModel")
var validation = require("../middlewares/validator")
router.get("/preview/:id", validation, async(req, res) => {
    const json_obj = await model.findOne({ _id: req.params.id })
    var json_res = { article: "", title: "", userName: "", dateTime: "" }
    json_res.article = json_obj.article
    json_res.title = json_obj.title
    json_res.userName = json_obj.userName
    json_res.dateTime = json_obj.dateTime
    res.status(200).render("./previewArticle.ejs", { json_res: json_res, id: req.params.id })
})
router.get("/previewForUpdate/:id", validation, async(req, res) => {
    const json_obj = await model.findOne({ _id: req.params.id })
    var json_res = { article: "", title: "", userName: "", dateTime: "" }
    json_res.article = json_obj.article
    json_res.title = json_obj.title
    json_res.userName = json_obj.userName
    json_res.dateTime = json_obj.dateTime
    res.status(200).render("./previewUpdate.ejs", { json_res: json_res, id: req.params.id })
})
module.exports = router