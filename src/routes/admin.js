const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/actions', adminController.admin);
router.get('/addfilm', adminController.addfilms);
router.get('/updatefilm', adminController.updatefilms);
router.get('/update/:id', adminController.updatefilms_id);
router.post('/updatenow/:id', adminController.updatenow);
router.get('/deletefilm', adminController.deletefilms);
router.get('/delete/:id', adminController.deletefilms_id);
router.post('/addfilm', adminController.addfilms_post);

module.exports = router;