const Post = require('../model/posts');
module.exports.requireAuth = function (req, res, next) {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    Post.find({ _id: req.signedCookies.userId }).then((user) => {
        if (!user) {
            res.redirect('/');
        }
    });
    next();
};

module.exports.requireadmin = function (req, res, next) {
    if (!req.cookies.isAdmin) {
        res.redirect('/');
    }
    next();
};

module.exports.requirelogin = function (req, res, next) {
    if (req.signedCookies.userId) {
        res.redirect('/');
        return;
    }
    next();
};

module.exports.requirelogined = function (req, res, next) {
    if (req.signedCookies.userId) {
        res.locals.login = true;
    }
    next();
};
