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

app.get("/fruits/:indexOfFruitsArray/edit", (req, res) => {
  res.render(
    "edit.ejs", //render views/edit.ejs
    {
      //pass in an object that contains
      fruit: fruits[req.params.indexOfFruitsArray], //the fruit object
      index: req.params.indexOfFruitsArray, //... and its index in the array
    }
  );
});

app.put("/fruits/:indexOfFruitsArray", (req, res) => {
  //:indexOfFruitsArray is the index of our fruits array that we want to change
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false
  }
  fruits[req.params.indexOfFruitsArray] = req.body //in our fruits array, find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
  res.redirect("/fruits") //redirect to the index page
})

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