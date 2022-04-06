const express = require('express');
const Device = require('../model/deviceModel');
const controller = require('../controllers/controller');
const authController = require('../controllers/authController');
const router = express.Router();

// HANDLES SINGLE DEVICE CONTROL PAGE
router.get('/device/:type/:id', controller.controlDevice);
router.route('/api/v1/devices').get(controller.getAllDevices).post(controller.addNewDevice);

// AUTHENTICATION
router.route('/register').post(authController.createNewUser).get(authController.loadRegisterPage);
router.route('/login').get(authController.loadLoginPage).post(authController.login);

// APIS
router
    .route('/api/v1/device/:id')
    .delete(controller.removeDevice)
    .get(controller.getDevice)
    .patch(controller.updateDevice);

module.exports = router;
