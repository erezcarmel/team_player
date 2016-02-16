'use strict'

let Datastore = require('nedb')
let db = new Datastore({ filename: 'temp/VideoList.db', autoload: true })

class VideoList {
	getAll() {
		return new Promise((resolve, reject) => {
			db.find({}, (err, docs) => {
				if (err) reject(err)
				resolve(docs)
			})
		})
	}
	get(id) {
		return new Promise((resolve, reject) => {
			db.find({_id: id}, {}, (err, docs) => {
				if (err) reject(err)
				resolve(docs)
			});
		})
	}
	add(video) {
		return new Promise((resolve, reject) => {
			db.insert(video, (err, doc) => {
				if (err) reject(err)
				resolve(doc)
			})
		})
	}
	remove(id) {
		return new Promise((resolve, reject) => {
			db.remove({_id: id}, {}, (err, doc) => {
				if (err) reject(err)
				resolve(doc)
			});
		})
	}
}

module.exports = new VideoList()
