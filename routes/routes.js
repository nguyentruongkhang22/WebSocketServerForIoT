const express = require('express');
const { loadLoginPage, loadRegisterPage } = require('../utils/loadPage');
const {
  getAllDevices,
  addNewDevice,
  removeDevice,
  updateDevice,
  getDevice,
  controlDevice,
} = require('../controllers/controller');

const { signup, login, logout, cookieJwtAuth } = require('../controllers/authController');

const router = express.Router();

router.get('/', cookieJwtAuth, (req, res) => {
  res.sendFile(`index.html`, { root: './public/html' });
});

// HANDLES SINGLE DEVICE CONTROL PAGE
router.get('/device/:type/:id', cookieJwtAuth, controlDevice);
router.route('/api/v1/devices').get(cookieJwtAuth, getAllDevices).post(addNewDevice);

// AUTHENTICATION
router.route('/register').post(signup).get(loadRegisterPage);
router.route('/login').get(loadLoginPage).post(login);
router.route('/logout').get(logout);

// APIS
router.route('/api/v1/device/:id').delete(removeDevice).get(getDevice).patch(updateDevice);

module.exports = router;
