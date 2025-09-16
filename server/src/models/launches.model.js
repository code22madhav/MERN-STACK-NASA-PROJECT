const axios = require('axios');

const launches=require('./launches.mongo');
const planets=require('./planet.mongo');

const DEFAULT_FLIGHT_NUMBER=100;
const SPACEX_API="https://api.spacexdata.com/v5/launches/query";

async function populatingLaunchDatabase(){
    console.log(`loading launch data`);
    const respose=await axios.post(SPACEX_API,{
        query: {},
        options: {
            pagination: false,
            populate:[
                {
                    path: 'rocket',
                    select:{
                        name: 1,
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1,
                    }
                }
            ]
        }
    });
    const launchDocs=respose.data.docs;
    for(const launchDoc of launchDocs){
        const customers=launchDoc['payloads'].flatMap(payload=>payload['customers']);
        const launch={
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        saveLaunch(launch);
    }
}

async function findLaunch(filter){
    return await launches.findOne(filter);
}

async function loadLaunchData(){
    //I think this is not a correct way what if the data is updated in API
    //this is just a temprory was to ristrict hitting the API again n again
    //if we have the first data i.e flightNumber 1
    const firstLaunch=await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    })
    if(firstLaunch){
        console.log(`Launch Data already exits`);
    }else{
        await populatingLaunchDatabase();
    }
}

async function exitsLaunchWithId(id){
    return await findLaunch({
        flightNumber: id,
    });
}

async function getAllLaunches(skip, limit){
    return await launches.find({},{
        '__v': 0,
        '_id': 0,
    })
    .sort({
        flightNumber: 1
    })
    .skip(skip)
    .limit(limit);
}

async function saveLaunch(launch){
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
    const targetPlanet=await planets.findOne({
        keplerName: launch.target,
    });
    if(!targetPlanet){
        throw new Error("Destination ExoPlanet doesn't exist");
    }
    let latestFlightNumber=await getLatestfligtNumber()+1;
    const newLaunch=Object.assign(launch,{
        customers: ['Madhav'],
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
    loadLaunchData,
    getAllLaunches,
    scheduleNewLaunch,
    exitsLaunchWithId,
    abortLaunchById,
};