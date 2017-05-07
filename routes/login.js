/**
 * Created by lethe on 17-5-6.
 */
var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check-login');

router.get('/login',checkLogin, function (req,res) {
    req.session.isLogin = true;
    res.render('login');
});

module.exports = router;