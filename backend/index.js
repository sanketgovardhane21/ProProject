const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
require("./Model/db")
const userRouter = require("./Routes/userRoutes")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Today i clear all my basics")
})

app.use("/api/auth", userRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`App is listening on port: ${PORT}`)
})