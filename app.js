const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});


const todolistSchema = {
  name: String
};



const Items = mongoose.model("Items", todolistSchema);

const items1 = new Items({
  name: "welcome "

});
const items2 = new Items({
  name: "welcome 2"

});
const defaultItems = [items1, items2];

Items.insertMany(defaultItems, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("success DB");
  }

});

app.get("/", function(req, res) {


  res.render("list", {
    listtitle: "Today"
    newlistItem: Items
  });



});
app.get("/work", function(req, res) {

  res.render("list", {
    listtitle: "work",
    newlistItem: workitems
  })

});





app.post("/", function(req, res) {

  console.log(req.body);
  if (req.body.list === "work") {
    item = req.body.newItem;
    workitems.push(item);
    res.redirect("/work");
  } else {
    item = req.body.newItem;
    items.push(item);
    res.redirect("/");

  }



});



app.listen(3000, function() {

  console.log("Server started on port 3000");
});
