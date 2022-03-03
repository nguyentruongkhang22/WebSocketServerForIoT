const express = require('express');
const http = require('http');

const Device = require('../model/deviceModel');
const controller = require('../controllers/controller');
const { get } = require('express/lib/response');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});
router.get('/add-new-device', (req, res) => {
    res.render('addNewDevice.ejs');
});

// router.get('/devices-list', controller.getDevicesList);
// router.get('/device/:id', controller.controlDevice);
// router.route('/api/v1/devices').get(controller.getAllDevices).post(controller.addNewDevice);
// router.route('/api/v1/device/:id').delete(controller.removeDevice).get(controller.getDevice);

module.exports = router;
