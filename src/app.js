const express = require('express');
require('dotenv').config();
const app = express();

// init middlewares
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// init db
require('./dbs/init.mongodb');

// init routes
// app.use('/', require('./routes'));

// handling error
app.use((error, req, res, next) => {
	const statusCode = error.status || 500;
	return res.status(statusCode).json({
		status: 'error',
		code: statusCode,
		stack: error.stack,
		message: error.message || 'Internal Server Error',
	});
});

module.exports = {app};
