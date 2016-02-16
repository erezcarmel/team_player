'use strict'

// let Datastore = require('nedb')
// let db = new Datastore({ filename: 'temp/VideoList.db', autoload: true })

const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://splayer:splayer1@ds011278.mongolab.com:11278/splayer';

class VideoList {
	constructor() {
		MongoClient.connect(url, (err, db) => {
			console.log("Connected correctly to db server");
			this.db = db
		});
	}
	getAll() {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err, docs) => {
				if (err) reject(err)
				resolve(docs)
			})
		})
	}
	get(id) {
		return new Promise((resolve, reject) => {
			this.db.find({_id: id}, {}, (err, docs) => {
				if (err) reject(err)
				resolve(docs)
			});
		})
	}
	add(video) {
		return new Promise((resolve, reject) => {
			this.db.insert(video, (err, doc) => {
				if (err) reject(err)
				resolve(doc)
			})
		})
	}
	remove(id) {
		return new Promise((resolve, reject) => {
			this.db.remove({_id: id}, {}, (err, doc) => {
				if (err) reject(err)
				resolve(doc)
			});
		})
	}
}

module.exports = new VideoList()
