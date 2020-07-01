const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");

var items = [];
var workitems = [];
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



app.get("/", function(req, res) {
let day = date.getDate();

  res.render("list", {
    listtitle: day,
newlistItem: items
  });



});
app.get("/work", function(req, res) {

res.render("list", {listtitle: "work" , newlistItem: workitems })

  });





app.post("/", function(req, res) {

console.log(req.body);
  if(req.body.list === "work"){
    item = req.body.newItem;
    workitems.push(item);
   res.redirect("/work");
 }else{
   item = req.body.newItem;
   items.push(item);
  res.redirect("/");

 }



});



  app.listen(3000, function() {

    console.log("Server started on port 3000");
  });
