const mongoose = require("mongoose")

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(()=> {
    console.log("Database connected...")
}).catch((err)=> {
    console.log("Database connection error:", err)
})