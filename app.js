require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const router = require("./routes/products")
const connectDB = require("./db/connect")

//middleware
app.use(express.json())

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API </h1> <a href="/api/v1/products">Products Route </a>')
})

//product routes
app.use("/api/v1/products", router)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server listening on the port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
