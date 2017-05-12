var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check-login');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login', checkLogin, function (req, res, next) {
    res.render('login');
});
router.post('/login',function (req,res) {
    var User = global.dbHandel.getModel('user');
    var uname = req.body.name;
    User.findOne({name: uname},function (err,doc) {
        console.log(doc, 'doc');
        if(err){
            res.send(500);
            res.json({
                code: 500,
                data: err
            })
        } else if(!doc){
            req.session.error = '用户不存在';
            res.json({
                code: 404,
                data:'用户不存在'
            })
        } else if(req.body.password != doc.password){
            req.session.error = '密码错误';
            res.json({
                code: 404,
                data:'密码错误'
            });
        }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
            console.log(doc.name,"doc");
            req.session.user = doc.name;
            //req.session.isLogin = true;
            res.json({
                code: 0,
                data:'登录成功'
            });
     }})
});
router.post('/register',function (req,res) {
    var User = global.dbHandel.getModel('user');
    var uname = req.body.name;
    var upwd = req.body.password;
    User.findOne({name: uname},function(err,doc){   // 同理 /login 路径的处理方式
        if(err){
            req.session.error =  '网络异常错误！';
            console.log(err);
            res.json({
                code: 500,
                data:  '网络异常错误！'
            });
        }else if(doc){
            req.session.error = '用户名已存在！';
            res.json({
                code: 500,
                data:  '用户名已存在！'
            });
        }else{
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            },function(err,doc){
                if (err) {
                    res.json({
                        code:1001,
                        data: err
                    })
                } else {
                    req.session.error = '用户名创建成功！';
                    res.json({
                        code:0,
                        data:'注册成功'
                    })
                }
            });
        }
    });
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/home', function (req, res) {
    console.log(req.session.user);
    /*if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录";
        res.redirect("/users/login");                //未登录则重定向到 /login 路径
    }else {*/
        res.render('home', {name: "忘川"});

});
module.exports = router;
