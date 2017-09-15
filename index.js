const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
// const flash = require('express-flash');
// const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/registration";
const Models = require("./models");
const models = Models(mongoURL);

var app = express();

//set up the engine
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

app.get("/", function(req, res) {
    res.render("home");
});

var regList = [];
app.post("/reg_numbers", function(req, res) {
    var regNumber = req.body.name;
    var reg = "";
    reg = regNumber;
    // regList.push(regNumber);
    res.render("home", {
        displayReg: reg
    })
    regList.push(regNumber);
});
app.get('/allReg', function(req, res) {
    res.render('home', {
        registrationNum: regList

    });
});

//start the server
var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
