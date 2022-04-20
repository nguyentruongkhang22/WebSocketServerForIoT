const { promisify } = require('util');

const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://do-an-212.herokuapp.com/';

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    if (!user) {
      console.log('fucked');
    } else {
      console.log(token);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
      });
      res.sendFile(`login.html`, { root: './public/html' });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    console.log(req.body.email);
    console.log(req.body.password);

    const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const isCorrectPassword = await user.correctPassword(req.body.password, user.password);

    if (!isCorrectPassword) {
      return res.status(403).sendFile(`login.html`, { root: './public/html' });
    }
    res.cookie('token', token, { httpOnly: true, secure: true });

    if (!user) {
      res.sendFile(`login.html`, { root: './public/html' });
    } else {
      console.log(user);
      res.redirect('/');
    }
  } catch (error) {
    return next(new Error(error));
  }
};

exports.cookieJwtAuth = async (req, res, next) => {
  try {
    if (req.cookies.token === undefined) {
      res.sendFile(`login.html`, { root: './public/html' });
    }
    const token = req.cookies.token;
    const user = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    return new Error(error);
  }
};

exports.logout = (req, res, next) => {
  if (req.cookies) {
    res.clearCookie('token');
  }
  // res.write('Logged out!');
  res.redirect('/login');
  // res.sendFile(`login.html`, { root: './public/html' });
};
