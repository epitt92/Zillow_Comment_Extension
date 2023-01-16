const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { register, login } = require('./controllers/UserController')
const { getComment, getComments, addComment, deleteComment } = require('./controllers/CommentController')
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: "*"
}))

mongoose.connect('mongodb+srv://jorgebarra:Jorgebarra@cluster0.mzo7eq5.mongodb.net/zillow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

//mongoose schema


//Routes
app.post("/api/register", register)
app.post("/api/login", login)

app.get("/api/comments", getComments)
app.get("/api/comments/:id", getComment)
app.post("/api/comments", addComment)
// app.put("/api/comments/:id", register)
app.delete("/api/comments/:id", deleteComment)

app.listen(9002,()=>{
    console.log("app is runing at 9002 port");
})