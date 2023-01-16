const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  name:String,
  email:String,
  pwd:String
}) 

module.exports = mongoose.model("User", userschema)