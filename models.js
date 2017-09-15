const mongoose = require('mongoose');

module.exports = function (mongoURL) {
  mongoose.connect(mongoURL);
  const regNumberSchema = mongoose.Schema({
    name: String,
    counter: Number
  })
  const Name = mongoose.model("Name", regNumberSchema)

  return {
    Name
  }

}
