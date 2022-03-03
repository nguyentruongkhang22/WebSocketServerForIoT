const Device = require('../model/deviceModel');

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

// exports.getDevicesList = async (req, res) => {
//     try {
//         const devices = await Device.find();
//         res.render('devicesList.ejs', {
//             devices: devices,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

exports.getDevice = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        res.status(404).json({
            status: 'success',
            data: device,
        });
    } catch (error) {
        console.log(error);
    }
};

// exports.controlDevice = async (req, res) => {
//     const device = await Device.findById(req.params.id);
//     console.log(device);
//     res.render('deviceControl.ejs', {
//         device: device,
//     });
// };
