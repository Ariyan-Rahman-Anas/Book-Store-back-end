const express = require("express")
const cors = require("cors")
require("dotenv").config();
const port = process.env.PORT || 5000
const app = express()
const dbConfig = require("./src/config/dbConfig")
dbConfig();



//root route
app.get("/", (req, res) => {
    res.send({message: "Book Store server is running..."})
})

//server testing
app.listen(port, () => {
    console.log(`Book Store app is running on:  http://localhost:${port}`);
} )