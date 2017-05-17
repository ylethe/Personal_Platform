var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.session.user = 'test';
  res.render('index', { title: 'Express' });
});

module.exports = router;
