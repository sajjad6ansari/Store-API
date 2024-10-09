const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
  name: {
    required: [true, "Product must have name"],
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product Price must be provided"],
  },
  company: {
    type: String,
    // enum: ["ikea", "liddy", "caressa", "marcos"],
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{value} is not supported",
    },
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model("Product", productSchema)
