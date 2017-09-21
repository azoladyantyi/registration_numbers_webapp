const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
// const flash = require('express-flash');
// const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/registration";
const models = require("./models");
var regNumbers = models();
// const models = Models(mongoURL);
//
var app = express();
//
var regNumbers = models();
var mongoose = require('mongoose')
// //set up the engine
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: "handlebars"
}));
app.use(express.static("public"));
app.use(express.static("views"))
app.use(form.urlencoded({
    extended: true
}));
app.set("view engine", "handlebars")

mongoose.connect('mongodb://localhost/registration');
 var db = mongoose.connection;
 //throw err

 db.on('error', console.error.bind(console, 'connection error:'));

app.get("/", function(req, res) {
  var regNumber = req.body.name;
    res.render("home");
});
//
var regList = [];
app.post("/reg_numbers", function(req, res) {
  var regNumber = req.body.name;

  regList.push(regNumber)
  models.create({name: regNumber}, function(err, result){
      if (err) {return (err)}
  });

  res.render('home',{
      displayReg: regList

    })
    // var reg = "";
    // reg = regNumber;
    // res.render("home", {
    //     displayReg: reg
    // })
});

//start the server
var server = app.listen(3000, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('Registration web app listening at http://%s:%s', host, port);

});
