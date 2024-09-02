let mongoose = require("mongoose");

let updateUser = new mongoose.Schema({

    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."] },
  
    edited: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ["user", "admin"], //role su admin ili user
        default: "user"
    },
    edit: {type: Boolean, default: true},


})

module.exports = mongoose.model("updateUser", updateUser);