/**
 *
 * Created by lethe on 17-5-6.
 */
module.exports = function (req, res, next) {
    if (req.session.isLogin) {
        res.redirect('/users/home');
    } else {
        next();
    }
};