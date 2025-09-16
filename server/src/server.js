const http = require('http');
const { connectDB } = require('./services/mongo')

const app=require('./app');
const { loadPlanetData } = require('./models/planet.model');
const { loadLaunchData } = require('./models/launches.model');

const PORT=process.env.PORT || 5000;
const server=http.createServer(app);

async function startServer(){
    await connectDB();
    await loadPlanetData();
    await loadLaunchData();
    server.listen(PORT,()=>{
        console.log(`Listening to PORT ${PORT}...`);
    })
}

startServer();




