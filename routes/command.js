var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.send(req.body.text);
});

module.exports = router;
