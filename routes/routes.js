const express = require('express');
const Device = require('../model/deviceModel');
const controller = require('../controllers/controller');
const router = express.Router();

// HANDLES SINGLE DEVICE CONTROL PAGE
router.get('/device/:type/:id', controller.controlDevice);
router.route('/api/v1/devices').get(controller.getAllDevices).post(controller.addNewDevice);
router.route('/register').post(controller.createNewUser).get(controller.loadRegisterPage);

// APIS
router.route('/login').get(controller.loadLoginPage).post(controller.login);

router
    .route('/api/v1/device/:id')
    .delete(controller.removeDevice)
    .get(controller.getDevice)
    .patch(controller.updateDevice);

module.exports = router;
