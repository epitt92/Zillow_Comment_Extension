const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  name:String,
  email:String,
  pwd:String,
  role: { type: Number, default: 0 },
}, {
  timestamps: true
}) 

module.exports = mongoose.model("User", userschema)