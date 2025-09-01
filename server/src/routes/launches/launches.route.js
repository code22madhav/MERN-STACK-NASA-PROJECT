const express = require('express');

const {httpGetLaunches, httpaddNewLaunch, httpAbortLaunch}=require('./launches.controller');

const launchRouter=express();

launchRouter.get('/',httpGetLaunches);
launchRouter.post('/',httpaddNewLaunch);
launchRouter.delete('/:id',httpAbortLaunch);

module.exports=launchRouter;