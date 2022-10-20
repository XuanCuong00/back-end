const Film = require('../model/films');
const { mutipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');

class AdminController {
    admin(req, res) {
        const title = 'Admin';
        return res.render('admin/actions', { title, login: true });
    }

    addfilms(req, res) {
        const title = 'Admin';
        return res.render('admin/addfilms', { title, login: true });
    }

    addfilms_post(req, res, next) {
        const title = 'Add films';
        const { ten, theloai, noidung, link } = req.body;
        Film.findOne({ ten: ten })
            .then((data) => {
                if (data) {
                    const msg =
                        'Cảnh báo: phim này đã được đăng tải trước đó!!!';
                    return res.render('admin/addfilms', {
                        title,
                        login: true,
                        msg,
                    });
                } else {
                    if (noidung === '') {
                        const noidung = 'Chưa cập nhật';
                        const newFilms = new Film({
                            ten: ten,
                            theloai: theloai,
                            noidung: noidung,
                            link: link,
                        });
                        newFilms.save();
                        return res.redirect('/');
                    } else {
                        const newFilms = new Film({
                            ten: ten,
                            theloai: theloai,
                            noidung: noidung,
                            link: link,
                        });
                        newFilms.save();
                        return res.redirect('/');
                    }
                }
            })
            .catch(next);
    }

    deletefilms(req, res, next) {
        const title = 'Xóa phim';
        var page = req.query.page || 1;
        var perpage = 8;
        Film.find({})
            .sort({ date: 1 })
            .skip(perpage * page - perpage)
            .limit(perpage)
            .then((theMovies) => {
                Film.countDocuments({}).then((num) => {
                    return res.render('admin/deletefilm', {
                        title,
                        delete: true,
                        login: true,
                        admin: true,
                        theMovies: mutipleMongooseToObject(theMovies),
                        num,
                        page,
                        perpage,
                    });
                });
            })
            .catch(next);
    }

    deletefilms_id(req, res, next) {
        Film.deleteMany({ _id: req.params.id }).then();
        return res.redirect('/admin/deletefilm');
    }

    updatefilms(req, res, next) {
        const title = 'Sửa phim';
        var page = req.query.page || 1;
        var perpage = 8;
        Film.find({})
            .sort({ date: 1 })
            .skip(perpage * page - perpage)
            .limit(perpage)
            .then((theMovies) => {
                Film.countDocuments({}).then((num) => {
                    return res.render('admin/updatefilm', {
                        title,
                        login: true,
                        admin: true,
                        theMovies: mutipleMongooseToObject(theMovies),
                        num,
                        page,
                        perpage,
                    });
                });
            })
            .catch(next);
    }

    updatefilms_id(req, res, next) {
        const title = 'Sửa phim';
        Film.findOne({ _id: req.params.id })
            .then((data) => {
                return res.render('admin/updateid', {
                    title,
                    login: true,
                    data: mongooseToObject(data),
                });
            })
            .catch(next);
    }

    updatenow(req, res, next) {
        const title = 'Sửa phim';
        Film.updateOne({ _id: req.params.id }, req.body)
            .then(() =>
                Film.findOne({ _id: req.params.id }).then((data) => {
                    return res.render('admin/updateid', {
                        title,
                        login: true,
                        data: mongooseToObject(data),
                    });
                })
            )
            .catch(next);
    }
}

module.exports = new AdminController();
