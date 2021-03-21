const express = require('express');
const ActionsRouter = require('./actions/actions-router');
const ProjectsRouter = require('./projects/projects-router');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use('/api/actions' , ActionsRouter)

module.exports = server;
