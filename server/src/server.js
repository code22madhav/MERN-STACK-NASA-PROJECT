const http = require('http');
const mongoose=require('mongoose');

const app=require('./app');
const { loadPlanetData } = require('./models/planet.model');

const PORT=process.env.PORT || 5000;
const MONGO_URL="mongodb+srv://madhav_db_user:ipLe0OIbcafr4qQd@madhavcluster.lzl8vfz.mongodb.net/";
const server=http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log("Database Connected");
})
mongoose.connection.on('error',(err)=>{
    console.error(`Error encountred in connecting DB ${err}`);
})
async function startServer(){
    await mongoose.connect(MONGO_URL);
    await loadPlanetData();
    server.listen(PORT,()=>{
        console.log(`Listening to PORT ${PORT}...`);
    })
}

startServer();




