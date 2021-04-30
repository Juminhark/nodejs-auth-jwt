const express = require('express');
const app = express();
const mongoose = require('mongoose');

//? Import Routes
const authRoute = require('./routes/auth');

//? Environment Variables from a .env
require('dotenv').config();

//? Connect to DB
mongoose.connect(
	process.env.DB_URL,
	{ useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('connected to db!');
	}
);

//? Middleware
app.use(express.json());

//? Route Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server Up and running'));
