const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Device = require('../model/deviceModel');
const { io } = require('socket.io-client');
const User = require('../model/userModel');

const url =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/'
        : 'https://do-an-212.herokuapp.com/';

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
        const device = await Device.findByIdAndUpdate(req.params.id, req.body);
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
    if (req.params.type === 'sensor') {
        res.sendFile(`sensor.html`, { root: './public/html' });
    } else if (req.params.type === 'regDevice') {
        res.sendFile(`regDevice.html`, { root: './public/html' });
    }
};
