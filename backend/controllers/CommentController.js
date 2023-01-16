const Comment = require('../models/Comment')

const getComments = (req , res)=> {
  console.log("Getcomments")
  Comment.find({}, (err, comments) => {
    if(comments){
      res.send({success:true, comments})
    }else{
        res.send({success:false, comments: []})
    }
  })
}

const getComment = (req , res)=> {
  const id = req.params.id;

  Comment.findById(id, (err,comment)=>{
      if(comment){
          res.send({success:true, comment})
      }else{
          res.send({success:false, comment: {}})
      }
  })
}

const addComment = (req , res)=> {
  const {username, url, content} = req.body
  const comment = new Comment({
      username,
      url,
      content
  })
  comment.save(err => {
      if(err){
          res.send({ success:false })
      }else{
          res.send({ success:true })
      }
  })
}

const deleteComment = (req , res)=> {
  const id = req.params.id;
  Comment.deleteOne({_id: id}, (err, count) => {
    if(count) {
      res.send({ success:false })
    }else{
      res.send({ success:true })
    }
  })
}
module.exports = { getComment, getComments, addComment, deleteComment }