const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {
	register,
	login,
	getUsers,
	deleteUsers,
} = require('./controllers/UserController');
const {
	getComment,
	getComments,
	addComment,
	deleteComment,
} = require('./controllers/CommentController');
const app = express();

var fs = require('fs');
var https = require('https');

app.use(express.json());
app.use(express.urlencoded());
app.use(
	cors({
		origin: '*',
	}),
);

mongoose.connect(
	'mongodb+srv://jorgebarra:Jorgebarra@cluster0.mzo7eq5.mongodb.net/zillow',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('DB connected');
	},
);

//mongoose schema

//Routes
app.post('/api/register', register);
app.post('/api/login', login);

app.get('/api/comments', getComments);
app.post('/api/comments/url', getComment);
app.post('/api/comments', addComment);
// app.put("/api/comments/:id", register)
app.delete('/api/comments/:id', deleteComment);

app.get('/api/users', getUsers);
app.delete('/api/users/:id', deleteUsers);

https
	.createServer(
		{
			key: fs.readFileSync('server.key'),
			cert: fs.readFileSync('server.cert'),
		},
		app,
	)
	.listen(9002, function () {
		console.log(
			'Example app listening on port 3000! Go to https://localhost:3000/',
		);
	});

// app.listen(9002, () => {
// 	console.log('app is runing at 9002 port');
// });
