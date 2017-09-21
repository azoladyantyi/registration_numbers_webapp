const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/registration";
const MongoURL =process.env.MONGO_DB_URL || "mongodb://localhost/registration";
mongoose.connect(mongoURL,{
  regAvailable: true
});
console.log("Connecting to MongoURL : " + MongoURL);
const regNumbers = mongoose.Schema({

  name: String
 });

var regNumber = mongoose.model("regNumber", regNumbers);

module.exports = regNumber;
