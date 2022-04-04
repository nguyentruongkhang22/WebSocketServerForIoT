const { default: mongoose } = require('mongoose');

const deviceSchema = mongoose.Schema({
    // owner: {
    //     type: String,
    //     required: true,
    // },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: 'Indoor Device',
    },
    deviceType: {
        type: String,
        enum: ['regDevice', 'sensor'],
        default: 'regDevice',
    },
    deviceStatus: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    humidity: {
        type: Number,
        required: false,
    },
    temperature: {
        type: Number,
        required: false,
    },
    heatIndex: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('Device', deviceSchema);
