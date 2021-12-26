const express = require("express")
const app = express()
const port = process.env.PORT || 2000
require('dotenv').config()
const cors = require("cors")
var cookieParser = require('cookie-parser')
const home = require("./controllers/homeAdmin")
const signIn = require("./controllers/signIn")
const signInApi = require("./api/signInLogic")
const preview = require("./controllers/adminPreview")
const crudRoute = require("./controllers/crudArticle")
const updates = require("./controllers/updates")
app.use(cors())
app.use(cookieParser())
const path = require("path");
app.set('view engine', 'ejs');
app.use('/static', express.static('static'))
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public/javascript/")));
app.use(express.static(path.join(__dirname, "public/")));
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: "50000"
}));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain)
app.use(signInApi)
app.use(home)
app.use(signIn)
app.use(preview)
app.use(crudRoute)
app.use(updates)
app.listen(port, (err) => {
    console.log("listning")
})