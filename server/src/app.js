const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetRouter=require('./routes/planets/planets.router');
const launchRouter = require('./routes/launches/launches.route');

const app=express();

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));

app.use(planetRouter);
app.use(launchRouter);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//why to use "/*any" our front-end is served from the index.html file inside public and if we simply write '/'
// it will send the index file at base route and even if we navigate throug the front-end it
//will work fine but if you will directly try to hit any url from browser like localhost:5000/launch
//it will through a error because this is handled by the express and express try matching with
//all midleware and routes but it if fails to do so then it throws error can't get....
// therefore adding *any after / works as a fallback that whatever doest matches in express send it
// to the front end maybe react router at front will catch that and throw the defined response
//and the matched route can also be later accessed at req.params.any


module.exports=app;