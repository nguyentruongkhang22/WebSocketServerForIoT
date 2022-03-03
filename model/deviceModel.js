const { default: mongoose } = require('mongoose');

const deviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
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
