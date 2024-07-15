const express = require("express")
const cors = require("cors")
require("dotenv").config();
const port = process.env.PORT || 5000
const app = express()
const dbConfig = require("./src/config/dbConfig")
dbConfig();
const cookieParser = require("cookie-parser");

const authRoute = require("./src/routes/authRoute")

//basic middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://city-books-store.netlify.app",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));


//root route
app.get("/", (req, res) => {
    res.send({message: "Book Store server is running..."})
})

//server testing
app.listen(port, () => {
    console.log(`Book Store app is running on:  http://localhost:${port}`);
})


// routes
app.use(authRoute);