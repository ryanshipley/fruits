// INITIALIZE EXPRESS APP
const express = require("express");
const app = express();
const port = 3000;
const fruits = require("./models/fruits.js");
//include the method-override package
const methodOverride = require("method-override")

app.use(express.urlencoded({extended: false}));

//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"))


// DEFINE OUR ROUTES
app.get("/fruits/", (req, res)=>{
    res.render("index.ejs", {
      allFruits: fruits
    });
});

//put this above your show.ejs file
app.get("/fruits/new", (req, res) => {
  res.render("new.ejs")
})

app.delete("/fruits/:indexOfFruitsArray", (req, res) => {
  fruits.splice(req.params.indexOfFruitsArray, 1) //remove the item from the array
  res.redirect("/fruits") //redirect back to index route
});

app.post("/fruits", (req, res) => {
  if(req.body.readyToEat === "on"){
    req.body.readyToEat = true;
  }else{
    req.body.readyToEat = false;
  }
  fruits.push(req.body);
  res.redirect("/fruits");
})

app.get("/fruits/:indexOfFruitsArray", (req, res)=>{
    res.render("show.ejs", {
      fruit: fruits[req.params.indexOfFruitsArray]
    })
});



// TELL OUR APP TO LISTEN ON PORT...
app.listen(port, ()=>{
    console.log(`listening on port `, port)
});