const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    name: "vase table",
    // nbHits: products.length, we will cover ehy this gives error
  })
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  //   console.log(req.query)
  //   const products = await Product.find(req.query)
  const { featured } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === "true" ? true : false
  }
  console.log(queryObject)
  const products = await Product.find(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
