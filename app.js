// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

// connect to mongodb database
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

// item schema

const itemSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  task: "Welcome to your to do list!",
});

const item2 = new Item({
  task: "Hit the + button to add a new item",
});

const item3 = new Item({
  task: "<--- Hit this to delete an item",
});

const defaultItems = [item1, item2, item3];
const workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  /* Item.find({}).then(function (err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      mongoose.connection.close()
      res.render("list", { listTitle: day, newListItems: foundItems });
    }
  }); */
  const items = Item.find({}).exec();
  items
    .then((items) => {
      console.log(items); // This will log an array of documents
      const day = date.getDate();
      res.render("list", { listTitle: day, newListItems: items });
    })
    .catch((err) => {
      console.error(err); // Handle any errors that occur
    });
});

app.post("/", function (req, res) {
  const newItem = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    /* items.push(newItem); */

    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
