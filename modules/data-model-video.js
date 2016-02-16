'use strict'

let Datastore = require('nedb')
let db = new Datastore({ filename: 'temp/VideoList.db', autoload: true })

class VideoList {
	getAll() {
		db.find({}, (err, docs) => {
			if (err) throw Error(err)
			return docs
		})
	}
	get(id) {
		db.find({_id: id}, {}, (err, docs) => {
			if (err) throw Error(err)
			return docs;
		});
	}
	add(video) {
		db.insert(video, (err, doc) => {
			if (err) throw Error(err)
			return doc
		})
	}
	remove(id) {
		db.remove({_id: id}, {}, (err, doc) => {
			if (err) throw Error(err)
			return doc
		});
	}
}

module.exports = new VideoList()
