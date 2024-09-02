
let mongoose = require("mongoose");

let User = new mongoose.Schema({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."] },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ["user", "admin"], //role su admin ili user
        default: "user"
    },
    edit: {type: Boolean, default: true},


})

module.exports = mongoose.model("User", User);