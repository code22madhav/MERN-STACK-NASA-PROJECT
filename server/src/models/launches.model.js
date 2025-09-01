const launches= new Map();

let latestFlightNumber=100;

const launch1={
    flightNumber: 100,
    launchDate: new Date('Janury 22, 2026'),
    mission: "Kelper mission",
    rocket: "space X",
    target: "KE144 B",
    customer: ['Madhav'],
    upcoming: true,
    success: true,
}
const launch2={
    flightNumber: 200,
    launchDate: new Date('Janury 22, 2026'),
    mission: "Kelper mission",
    rocket: "space X",
    target: "KE144 B",
    customer: ['Madhav'],
    upcoming: true,
    success: true,
}
launches.set(launch1.flightNumber,launch1);
launches.set(launch2.flightNumber,launch2);

function exitsLaunchWithId(id){
    return launches.has(id);
}

function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch,{
        customer: ['Madhav'],
        upcoming: true,
        success: true,
        flightNumber: latestFlightNumber,
    }));
}

function abortLaunchById(flightNumber){
    const abortedLaunch=launches.get(flightNumber);
    abortedLaunch.upcoming=false;
    abortedLaunch.success=false;
    return addNewLaunch; 
}

module.exports={
    getAllLaunches,
    addNewLaunch,
    exitsLaunchWithId,
    abortLaunchById,
};