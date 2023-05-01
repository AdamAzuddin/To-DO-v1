// jshint esversion:6

const express = require("express")
const bodyParser  = require("body-parser")

const app = express()

app.get("/", function (req,res){
    var today  = new Date()
    currentDay = today.getDay()
})

app.listen(3000, function (){
    console.log("Server started on port 3000")
})
