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
    const {email,pwd} = req.body
    User.findOne({email:email,pwd:pwd}, (err,user)=>{
        if(user){
            res.send({isAuth:true, user})
        }else{
            res.send({isAuth:false, user: {}})
        }
    })
}

module.exports = { register, login }