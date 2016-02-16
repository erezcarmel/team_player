var express = require('express');
var router = express.Router();
var api = require('../api/commandAPI')

/* GET home page. */
router.post('/', function(req, res, next) {
  //res.send(req.body.text);
  api.handleCommand(req.body.text).then( result => {

      res.send(result);

  },
  err => {
    res.status(404);
    res.statusMessage(err);
    res.end();
  })
});

module.exports = router;
