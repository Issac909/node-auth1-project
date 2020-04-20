const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const sessionConfig = require('./sessionConfig');

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/router.js');
const restricted = require('../auth/restricted-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use('/api/users', restricted, usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ api: up });
});

module.exports = server