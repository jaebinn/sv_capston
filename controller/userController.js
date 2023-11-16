// controller/userController.js
const User = require('../models/user');

module.exports = {
    // 로그인, 회원가입 페이지 이동 
    signIn: (req, res) => {
        res.render('user/login')
    },

    signUp: (req, res) => {
        res.render('user/register');
    },
    signOut: (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
}

