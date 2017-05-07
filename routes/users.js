var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check-login');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login', checkLogin, function (req, res, next) {
    req.session.isLogin = true;
    res.render('login');
});

router.get('/register', function (req, res) {
    res.render('register');
});
module.exports = router;
