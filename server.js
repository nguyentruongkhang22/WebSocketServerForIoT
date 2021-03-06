// DEPENDENCIES
const express = require('express');
const { Server } = require('socket.io');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');

const router = require('./routes/routes');
const path = require('path');

// SETUP
dotenv.config({ path: './config.env' });
const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://do-an-212.herokuapp.com/';

const PORT = process.env.PORT;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const app = express();
const server = http.createServer(app);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DATABASE Connected 💯 💯 💯'))
  .catch((e) => console.log(e));

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use('/device', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const io = new Server(server);

// ROUTING
app.use('/', router);

// WEBSOCKET CONNECTION
io.on('connection', (socket) => {
  console.log('WEBSOCKET Connected 💯 💯 💯');
  socket.on('change', (deviceStatus) => {
    console.log(`${deviceStatus ? 'on' : 'off'}`);
  });

  socket.on('patch', async (statusChange, deviceId) => {
    console.log(statusChange, deviceId);
    socket.broadcast.emit('sendFromDevice', statusChange.deviceStatus, deviceId);
  });
});

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

// SERVER
server.listen(PORT || 3000, () => {
  console.log(`Server is running on 💯💯  ${url} 💯💯`);
});
