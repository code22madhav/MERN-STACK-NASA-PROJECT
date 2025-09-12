const {parse}=require('csv-parse');
const fs = require('fs');
const path = require('path');

const planets=require('./planet.mongo');

function isHabitable(planet){
    return planet.koi_disposition ==='CONFIRMED' && planet.koi_prad < 1.6 && planet['koi_insol']<1.11 && planet['koi_insol'] > 0.36;
}

function loadPlanetData(){
    return new Promise((resolve,reject)=>{
        fs.createReadStream(path.join(__dirname, '..', '..', 'data','/kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', async(data)=>{
            if(isHabitable(data)){
                await setPlanet(data);
            }
        })
        .on('error', (err)=>{
            console.log(err);
            reject(err);
        })
        .on('end', ()=>{
            resolve();
        })
    });
}

async function getAllPlanets(){
    return await planets.find({});
}

async function setPlanet(planet){
    try {
        await planets.updateOne({
        keplerName: planet.kepler_name,
        },{
            keplerName: planet.kepler_name,
        },{
            upsert: true,
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    loadPlanetData,
    getAllPlanets,
};