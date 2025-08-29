const {parse}=require('csv-parse');
const fs = require('fs');
const path = require('path');

const HabitablePlanet=[];

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
        .on('data', (data)=>{
            if(isHabitable(data)){
                HabitablePlanet.push(data);
            }
        })
        .on('error', (err)=>{
            console.log(err);
            reject(err);
        })
        .on('end', ()=>{
            console.log(`Habitable Planet data loaded`);
            resolve();
        })
    });
}

function getAllPlanets(){
    return HabitablePlanet;
}
module.exports={
    loadPlanetData,
    getAllPlanets,
};