const Films = require('../model/films');
const { mutipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');

class SiteController {
    index(req, res, next) {
        if (!req.signedCookies.userId) {
            const title = 'Trang Chủ';
            return res.render('home', { title, login: false });
        }
        if (req.signedCookies.userId) {
            const title = 'Trang chủ';
            var page = req.query.page || 1;
            var perpage = 8;
            Films.find({})
                .sort({ date: 1 })
                .skip(perpage * page - perpage)
                .limit(perpage)
                .then((theMovies) => {
                    Films.countDocuments({}).then((num) => {
                        if (req.cookies.isAdmin) {
                            return res.render('home', {
                                title,
                                login: true,
                                admin: true,
                                theMovies: mutipleMongooseToObject(theMovies),
                                num,
                                page,
                                perpage,
                            });
                        } else {
                            return res.render('home', {
                                title,
                                login: true,
                                theMovies: mutipleMongooseToObject(theMovies),
                                num,
                                page,
                                perpage,
                            });
                        }
                    });
                })
                .catch(next);
        }
    }

    logout(req, res) {
        res.cookie('userId', 'logout');
        return res.redirect('/');
    }

    showfilm(req, res) {
        Films.findOne({ slug: req.params.slug }).then((show) => {
            const title = 'Xem phim ' + show.ten;
            return res.render('show', {
                title,
                show: mongooseToObject(show),
                login: true,
            });
        });
    }

    hanhdong(req, res) {
        const title = 'Phim hành động';
        var page = req.query.page || 1;
        var perpage = 8;
        Films.find({ theloai: 'Hành động' })
            .sort({ date: 1 })
            .skip(perpage * page - perpage)
            .limit(perpage)
            .then((data) => {
                Films.countDocuments({ theloai: 'Hành động' }).then((num) => {
                    if (req.cookies.isAdmin) {
                        return res.render('theloai', {
                            title,
                            login: true,
                            admin: true,
                            data: mutipleMongooseToObject(data),
                            num,
                            page,
                            perpage,
                        });
                    } else {
                        return res.render('theloai', {
                            title,
                            login: true,
                            data: mutipleMongooseToObject(data),
                            num,
                            page,
                            perpage,
                        });
                    }
                });
            });
    }

    tinhcam(req, res) {
        const title = 'Phim tình cảm';
        var page = req.query.page || 1;
        var perpage = 8;
        Films.find({ theloai: 'Tình cảm' })
            .sort({ date: 1 })
            .skip(perpage * page - perpage)
            .limit(perpage)
            .then((data) => {
                Films.countDocuments({ theloai: 'Tình cảm' }).then((num) => {
                    if (req.cookies.isAdmin) {
                        return res.render('theloai', {
                            title,
                            login: true,
                            admin: true,
                            data: mutipleMongooseToObject(data),
                            num,
                            page,
                            perpage,
                        });
                    } else {
                        return res.render('theloai', {
                            title,
                            login: true,
                            data: mutipleMongooseToObject(data),
                            num,
                            page,
                            perpage,
                        });
                    }
                });
            });
    }

    vientuong(req, res) {
        const title = 'Phim viễn tưởng';
        var page = req.query.page || 1;
        var perpage = 8;
        Films.find({ theloai: 'Viễn tưởng' })
            .sort({ date: 1 })
            .skip(perpage * page - perpage)
            .limit(perpage)
            .then((data) => {
                Films.countDocuments({ theloai: 'Viễn tưởng' }).then((num) => {
                    if (req.cookies.isAdmin) {
                        return res.render('theloai', {
                            title,
                            login: true,
                            admin: true,
                            data: mutipleMongooseToObject(data),
                            num,
                            page,
                            perpage,
                        });
                    } else {
                        return res.render('theloai', {
                            title,
                            login: true,
                            data: mutipleMongooseToObject(data),
                            num,
                            page,
                            perpage,
                        });
                    }
                });
            });
    }

    timkiem(req, res, next) {
        const title = 'tìm kiếm';
        const tukhoa = req.body.tukhoa;
        if (tukhoa == '') {
            return res.render('home', {
                title,
                msg: 'NHẬP TÊN PHIM MUỐN TÌM KIẾM!',
            });
        } else {
            Films.find({ ten: { $regex: tukhoa, $options: 'iu' } })
                .then((theMovies) => {
                    Films.countDocuments({
                        ten: { $regex: tukhoa, $options: 'iu' },
                    }).then((num) => {
                        if (num < 1) {
                            return res.render('home', {
                                title,
                                msg: 'KHÔNG TÌM THẤY TÊN PHIM',
                            });
                        } else {
                            return res.render('home', {
                                title,
                                theMovies: mutipleMongooseToObject(theMovies),
                                num,
                            });
                        }
                    });
                })
                .catch(next);
        }
    }
}

module.exports = new SiteController();
