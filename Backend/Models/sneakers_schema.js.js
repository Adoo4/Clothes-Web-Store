let mongoose = require("mongoose");

let SneakersSchema = new mongoose.Schema({

    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: { type: [mongoose.Schema.Types.Mixed], required: true },
    color: { type: String, required: true },
    imageUrl: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    description: { type: String }
})


module.exports = mongoose.model("SneakersSchema", SneakersSchema)