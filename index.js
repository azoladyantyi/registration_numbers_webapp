const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
// const flash = require('express-flash');
// const session = require('express-session');
const bodyParser = require('body-parser');
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
    var reg = req.body.regNumber;
    if (reg === "") {
      res.redirect('/')
    }
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
  // console.log(reg);

  models.find({
    name: {
            $regex: reg,
            $options : "i"   // find incrementally - find all matches!!!
        }
  }, function(err, results) {
      if (err) {
          console.log(err);
      }
      // console.log(results.length);
      res.render("home", {
        displayReg: results
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
app.set('port', (process.env.PORT || 5000));

app.use(function(err, req, res) {
    // res.status(500).send(err.stack)
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port' + app.get('port'));

});
