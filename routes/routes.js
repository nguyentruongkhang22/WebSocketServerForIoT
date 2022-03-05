const express = require('express');
const http = require('http');

const Device = require('../model/deviceModel');
const controller = require('../controllers/controller');

const router = express.Router();

// router.get('/all-device', controller.getDevicesList);
router.get('/device/:id', controller.controlDevice);
router.route('/api/v1/devices').get(controller.getAllDevices).post(controller.addNewDevice);
router
    .route('/api/v1/device/:id')
    .delete(controller.removeDevice)
    .get(controller.getDevice)
    .patch(controller.updateDevice);

module.exports = router;
