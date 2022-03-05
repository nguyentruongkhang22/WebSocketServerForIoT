const Device = require('../model/deviceModel');

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
    res.sendFile(`device.html`, { root: './public' });
};
