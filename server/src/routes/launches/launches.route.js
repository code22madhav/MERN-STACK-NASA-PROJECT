const express = require('express');

const {httpGetLaunches, httpaddNewLaunch}=require('./launches.controller');

const launchRouter=express();

launchRouter.get('/',httpGetLaunches);
launchRouter.post('/',httpaddNewLaunch);

module.exports=launchRouter;