const User = require('../models/User')

const register = (req , res)=> {
  const {name,email,pwd} = req.body
  
  User.findOne({email:email},(err , user) => {
      console.log(user)
      if(user){
          res.send({ isAuth:false, msg: "email already exist" })
      }else{
          const user = new User({
              name:name,
              email,
              pwd
          })
          user.save(err => {
              if(err){
                  res.send({ isAuth:false })
              }else{
                  res.send({ isAuth:true })
              }
          })
      }
  })
}

const login = (req , res)=> {
    console.log("login")
    const {email,pwd, admin} = req.body
    let query = {};
    if( admin ){
        query = {email, pwd, role: 1};
    } else {
        query = {email, pwd};
    }
    User.findOne(query, (err,user)=>{
        if(user){
            res.send({isAuth:true, user})
        }else{
            res.send({isAuth:false, user: {}})
        }
    })
}

const getUsers = (req , res)=> {
    console.log("getusers")
    User.find({role:0}, (err, users) => {
      if(users){
        res.send({success:true, users})
      }else{
          res.send({success:false, users: []})
      }
    })
}

const deleteUsers = (req , res)=> {
    const id = req.params.id;
    console.log("deltete")
    User.deleteOne({_id: id}, (err, count) => {
      console.log(count)
      if(!count) {
        res.send({ success:false })
      }else{
        User.find({}, (err, users) => {
          if(users){
            res.send({success:true, users})
          }else{
            res.send({success:false, users: []})
          }
        })
      }
    })
  }
module.exports = { register, login, getUsers, deleteUsers }