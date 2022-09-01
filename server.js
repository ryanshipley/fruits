// INITIALIZE EXPRESS APP
const express = require("express");
const app = express();
const port = 3000;
const fruits = require("./models/fruits.js");

// app.use((req, res, next) => {
//   console.log("I run for all routes")
//   next()
// })

app.use(express.urlencoded({extended: false}));

// DEFINE OUR ROUTES
app.get("/fruits/", (req, res)=>{
    res.render("index.ejs", {
      allFruits: fruits
    })
});

//put this above your show.ejs file
app.get("/fruits/new", (req, res) => {
  res.render("new.ejs")
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
})

// TELL OUR APP TO LISTEN ON PORT...
app.listen(port, ()=>{
    console.log(`listening on port `, port)
});