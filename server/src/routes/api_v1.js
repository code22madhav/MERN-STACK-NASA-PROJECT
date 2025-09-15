const express = require('express');

const planetRouter=require('./planets/planets.router');
const launchRouter = require('./launches/launches.route');

const api_v1=express.Router();

api_v1.use('/planets',planetRouter);
api_v1.use('/launches',launchRouter);

module.exports=api_v1;