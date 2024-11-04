'use strict';

const mongoose = require('mongoose');
const connectString = `mongodb+srv://bachoilabach:bach112003@clustertiktok.yl656aq.mongodb.net/expert_system`;

class Database {
	constructor() {
		this.connect();
	}

	//connect
	connect(type = 'mongodb') {
		mongoose
			.connect(connectString)
			.then((_) => console.log('Connect to db success!'))
			.then(mongoose.set('debug', true))
			.catch((err) => console.log('Error Connect!'));
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
