const express = require('express')
const router = express.Router()
const validator = require("../middlewares/validator")
const model = require("../models/articlesModel")
router.get("/updates", validator, async(req, res) => {
    const len = await model.countDocuments()
    var size = len / 10;
    if (len % 10 != 0)
        size++;
    const json_list = await model.find({ isForUpdate: true }).limit(10)
    res.status(200).render("./homeAdmin.ejs", { json_list: json_list, size: size, current: 1, name: "updates" })

})
router.get("/updates/page/:page", validator, async(req, res) => {
    const page = req.params.page
    if (page == "1" || isNaN(page))
        res.status(200).redirect("/")
    else if (parseInt(page, 10) <= 0) {
        res.status(200).redirect("/")
    } else {
        const len = await model.countDocuments()
        var size = len / 10;
        if (len % 10 != 0)
            size++;
        if ((page - 1) * 10 < len) {
            const json_list = await model.find({ isForUpdate: true }).skip((page - 1) * 10).limit(10)
            res.status(200).render("./homePage.ejs", { json_list: json_list, size: size, current: page, name: "updates" })
        } else {
            res.status(200).redirect("/")
        }
    }
})
module.exports = router