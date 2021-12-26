const mongo = require("mongoose")
mongo.connect(process.env.dbId, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => console.log("mongodb connected")).catch(e => console.log("mongo errror" + " : " + e))
const model = mongo.model("Admin", {
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: 4

    },
    password: {
        type: String,
        required: true,

    }


})
module.exports = model