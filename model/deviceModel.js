const { default: mongoose } = require('mongoose');

const deviceSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: 'Indoor Device',
    },
    deviceStatus: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Device', deviceSchema);
