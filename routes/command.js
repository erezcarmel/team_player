var express = require('express');
var router = express.Router();
var parser = require('../parsers/commandParser')

/* GET home page. */
router.post('/', function(req, res, next) {
  //res.send(req.body.text);
  parser.parse(req.body.text, (err, result) => {
    if(!err){
      res.send(JSON.stringify(result));
    }
  })
});

module.exports = router;
