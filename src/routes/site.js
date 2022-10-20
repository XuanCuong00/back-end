const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/authmiddlewares');
const siteController = require('../controller/siteController');

router.get('/', siteController.index);
router.get('/logout', siteController.logout);
router.get('/theloai/hanhdong', siteController.hanhdong);
router.get('/theloai/tinhcam', siteController.tinhcam);
router.get('/theloai/vientuong', siteController.vientuong);
router.get('/showfilm/:slug',authMiddlewares.requireAuth, siteController.showfilm);
router.post('/timkiem', siteController.timkiem)

module.exports = router;