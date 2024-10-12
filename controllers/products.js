const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
  const search = "ab"
  // const products = await Product.find({}).sort("-name -price")
  const products = await Product.find({})
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(5)
  // nbHits: products.length, we will cover ehy this gives error
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === "true" ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }
  }

  let result = Product.find(queryObject)
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ")
    result = result.sort(sortList)
  } else {
    result = result.sort("createdAt")
  }
  //fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ")
    result = result.select(fieldsList)
  }

  const products = await result

  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
