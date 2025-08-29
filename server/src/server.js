const http = require('http');

const app=require('./app');
const { loadPlanetData } = require('./models/planet.model');

const PORT=process.env.PORT || 8000;

console.log(PORT)

const server=http.createServer(app);

async function startServer(){
    await loadPlanetData();
    server.listen(PORT,()=>{
        console.log(`Listening to PORT ${PORT}...`);
    })
}

startServer();




