const {getAllPlanets} = require('../../models/planet.model');

async function httpGetAllPlanets(req,res){
    let habitablePlanets=await getAllPlanets();
    return res.status(200).json(habitablePlanets);
}

module.exports={
    httpGetAllPlanets,
}