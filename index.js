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
    var reg = req.body.name;
    models.find({}, function(err, results) {
        if (err) {
            console.log(err);
        }
        res.render("home", {
            displayReg: results
        });
    })
});
var regList = [];
app.post("/reg_numbers", function(req, res) {
    var reg = req.body.name;
    models.findOne({
        name: reg
    }, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            if (!result) {
                models.create({
                    name: reg
                }, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        result.save(function(err, results) {
                            console.log(results);
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect('/');
                            }
                        })
                    }
                });
            }
        }
    })

});


//the function to filter the towns
app.post("/selectTown", function(req, res) {
  var reg = req.body.town;
  console.log(reg);
  models.find({
    name: {
            $regex: reg

        }
  }, function(err, results) {
      if (err) {
          console.log(err);
      }
      res.render("home", {
        displayReg: reg
      });
  })


});

app.post("/all", function(req, res) {

  models.find({}, function(err, all) {
      if (err) {
          console.log(err);
      }
      res.render("home", {
          displayReg: all
      });
  })


});



//start the server
var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Registration web app listening at http://%s:%s', host, port);

});
