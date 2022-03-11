const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

exports.module = mongoose.model('User', User);
