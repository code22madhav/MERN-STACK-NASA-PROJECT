const express = require('express');

const httpGetLaunches=require('./launches.controller');

const launchRouter=express();

launchRouter.get('/launches',httpGetLaunches);

module.exports=launchRouter;