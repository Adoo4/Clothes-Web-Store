let mongoose = require("mongoose");

let Purchased = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true
  },
  items: [
    {
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AllProduct",  
        
      },
    quantity: {
        type: Number,
        default: 1
      }
      
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },

  value: {
    type: Number
  }

});

module.exports = mongoose.model("Purchased", Purchased);