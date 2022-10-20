const siteRouter = require('./site');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const authMiddlewares = require('../middlewares/authmiddlewares');
function route(app){
    app.use('/', authMiddlewares.requirelogined,siteRouter);
    app.use('/auth', authMiddlewares.requirelogin, authRouter);
    app.use('/admin', authMiddlewares.requireadmin, adminRouter);
}

module.exports = route;