const launches=require('./launches.mongo');
const planets=require('./planet.mongo');

const DEFAULT_FLIGHT_NUMBER=100;

async function exitsLaunchWithId(id){
    return await launches.findOne({},{
        flightNumber: id,
    });
}

async function getAllLaunches(){
    return await launches.find({},{
        '__v': 0,
        '_id': 0,
    })
}

async function saveLaunch(launch){
    const targetPlanet=await planets.findOne({
        keplerName: launch.target,
    });
    if(!targetPlanet){
        throw new Error("Destination ExoPlanet doesn't exist");
    }
    return await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    },launch,{ upsert: true});
}

async function getLatestfligtNumber(){
    let latestflight=await launches.findOne().sort('-flightNumber');
    if(!latestflight){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestflight.flightNumber;
}

async function scheduleNewLaunch(launch){
    let latestFlightNumber=await getLatestfligtNumber()+1;
    const newLaunch=Object.assign(launch,{
        customer: ['Madhav'],
        upcoming: true,
        success: true,
        flightNumber: latestFlightNumber,
    })
    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId){
    let updatedLaunch=await launches.updateOne({flightNumber: launchId},{
        upcoming: false,
        success: false,
    })
    return updatedLaunch.modifiedCount === 1;
}

module.exports={
    getAllLaunches,
    scheduleNewLaunch,
    exitsLaunchWithId,
    abortLaunchById,
};