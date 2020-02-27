const express = require('express');
const apiRouter = require('./apiRouter.js');

const morgan = require('morgan');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
const knex = require('../data/dbConfig.js');

const server = express();

let sessionConfig = {
    name: 'User',//default sid
    secret: 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000 * 60 * 3, 
        secure: false, 
        httpOnly: true, 
    },
    store: new KnexStore({
        knex: knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15,
    }),
    resave: false,
    saveUninitialized: false 
}

server.use(express.json());
server.use(morgan('dev'));
server.use(session(sessionConfig));
server.use('/api', apiRouter);

module.exports = server;