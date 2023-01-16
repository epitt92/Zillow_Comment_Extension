const mongoose = require('mongoose');

const commentschema = new mongoose.Schema({
  username:String,
  url: String,
  content: String
},{
  timestamps:true
}
) 

module.exports = mongoose.model("Comment", commentschema)