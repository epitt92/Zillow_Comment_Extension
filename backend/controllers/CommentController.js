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

  const { url } = req.body;
  console.log("get comment:", url);
  Comment.find({url}, (err,comments)=>{
      if(comments){
          res.send({success:true, comments})
      }else{
          res.send({success:false, comments: []})
      }
  })
}

const addComment = (req , res)=> {
  const {username, content, url} = req.body
  console.log("add comment", username, content, url)
  const comment = new Comment({
      username,
      url,
      content
  })
  comment.save(err => {
      if(err){
          res.send({ success:false, comments: [] })
      }else{
        Comment.find({url}, (err, comments) => {
          if(comments){
            res.send({success:true, comments})
          }else{
              res.send({success:false, comments: []})
          }
        })
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