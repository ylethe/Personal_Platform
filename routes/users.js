var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check-login');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login', checkLogin, function (req, res, next) {
    //req.session.isLogin = true;
    res.render('login');
});
router.post('/login',function (req,res) {
    var user = {
        name: '忘川',
        password: '123456'
    };
    if (req.body.name == user.name && req.body.password == user.password) {
        req.session.user = user;
        res.json({
            code:0,
            token: '231321',
            data:'登录成功'
        })
    } else {
        req.session.error = "用户名或密码不正确";
        res.json({
            code:10001,
            data: '用户名或者密码错误'
        })
    }
});
router.post('/register',function (req,res) {
    res.json({
        code: 0
    })
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/home', function (req, res) {
    res.render('home');
});
module.exports = router;
