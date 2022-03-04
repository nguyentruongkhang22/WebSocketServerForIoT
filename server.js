// DEPENDENCIES
const express = require('express');
const { Server } = require('socket.io');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http');
const router = require('./routes/routes');
const url = 'http://localhost:3000/';
const path = require('path');

// SETUP
dotenv.config({ path: './config.env' });
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
app.use(bodyParser.json());
const io = new Server(server);
// ROUTING
app.use('/', router);

// WEBSOCKET CONNECTION
io.on('connection', (socket) => {
    console.log('WEBSOCKET Connected 💯 💯 💯');
    socket.on('change', (deviceStatus) => {
        console.log(`why? ${deviceStatus ? 'on' : 'off'}`);
    });
    setTimeout(() => {
        socket.emit('testing', true);
    }, 3000);
});

// SERVER
server.listen(PORT || 3000, () => {
    console.log(`Server is running on 💯💯  ${url} 💯💯`);
});
