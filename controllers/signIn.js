const express = require('express')
const router = express.Router()
const validator = require("../middlewares/signInvalidator")
router.get("/signIn", validator, (req, res) => {
    res.status(200).render("../views/signIn")
})
module.exports = router