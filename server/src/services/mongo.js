const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;

mongoose.connection.once('open',()=>{
    console.log("Database Connected");
})
mongoose.connection.on('error',(err)=>{
    console.error(`Error encountred in connecting DB ${err}`);
})

async function connectDB(){
    await mongoose.connect(url);
}

async function disconnectDB(){
    await mongoose.disconnect();
}

module.exports={
    connectDB,
    disconnectDB
}