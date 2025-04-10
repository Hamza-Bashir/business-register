const express = require("express")
const app = express()
const db = require("./models")
console.log(Object.keys(db))

app.use(express.json())

app.listen(3000, ()=>{
    console.log("Server started")
})