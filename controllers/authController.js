const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const url =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/'
        : 'https://do-an-212.herokuapp.com/';

exports.createNewUser = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        if (!user) {
            console.log('fucl');
        } else {
            console.log(token);
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

exports.loadLoginPage = async (req, res) => {
    res.sendFile(`login.html`, { root: './public/html' });
};

exports.loadRegisterPage = (req, res) => {
    res.sendFile(`register.html`, { root: './public/html' });
};
