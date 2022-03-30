const Device = require('../model/deviceModel');
const { io } = require('socket.io-client');
const User = require('../model/userModel');

const url = process.env.ENV === 'development' ? 'http://localhost:3000/' : '..';

var socket = io.connect(url, { reconnect: true });

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Node Client Connected!');
});

// BELOW IS CRUD OPERATIONS
exports.getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json({
            status: 'success',
            data: devices,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'fail',
            msg: error,
        });
    }
};

exports.addNewDevice = async (req, res) => {
    try {
        const devices = await Device.create(req.body);
        res.status(200).json({
            status: 'success',
            data: devices,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'fail',
            msg: error,
        });
    }
};

exports.removeDevice = async (req, res) => {
    try {
        const devices = await Device.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: devices,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'fail',
            msg: error,
        });
    }
};

exports.updateDevice = async (req, res) => {
    try {
        socket.emit('patch', req.body, req.params.id);
        const device = await Device.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: device,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'fail',
            msg: error,
        });
    }
};

// ABOVE IS CRUD OPERATIONS

// exports.getDevicesList = (req, res) => {
//     res.sendFile(`device.html`, { root: './public/' });
// };

exports.getDevice = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: device,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'fail',
            msg: error,
        });
    }
};

exports.controlDevice = async (req, res) => {
    const device = await Device.findById(req.params.id);
    console.log(req.params);
    res.sendFile(`device.html`, { root: './public/html' });
};

exports.loadLoginPage = async (req, res) => {
    res.sendFile(`login.html`, { root: './public/html' });
};

exports.loadRegisterPage = (req, res) => {
    res.sendFile(`register.html`, { root: './public/html' });
};

exports.createNewUser = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        if (!user) {
            console.log('fucl');
        } else {
            res.sendFile(`login.html`, { root: './public/html' });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });
        if (!user) {
            res.sendFile(`login.html`, { root: './public/html' });
        } else {
            console.log(user);
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
};
