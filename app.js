const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

console.log(date);

const app = express();

const items = ["Eat Breakfast", "Hit the Gym", "Walk the Dog", "LEARN MORE CODE!"];
const workItems = ["Write Code", "Test Code", "Refactor Code"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {

    const day = date.getDate();

    res.render("list", { 
        listTitle: day,
        newListItems: items 
    });

});


app.post("/", function(req, res){
    const item = req.body.newItem;

    if(req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work")
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    })
});


app.post("/work", function(req, res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
});


app.listen(3000, function () {
    console.log("App listening on port 3000.");
});