'use strict'
const express = require('express')
const router = express.Router()
const videos = require('../modules/data-model-video')

router.get('/', (req, res, next) => {
	videos.getAll().then((videos) => res.send(videos))
});

router.get('/:id', (req, res, next) => {
	videos.get(req.params.id).then((video) => res.send(video))
});

router.delete('/:id', (req, res, next) => {
	videos.remove(req.params.id).then((video) => res.send(video))
});

module.exports = router;
