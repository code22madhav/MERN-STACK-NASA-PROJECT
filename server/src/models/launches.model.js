const launches= new Map();

let latestFlightNumber=100;

const launch={
    flightNumber: 100,
    launchDate: new Date('Janury 22, 2026'),
    mission: "Kelper mission",
    rocket: "space X",
    target: "KE144 B",
    customer: ['Madhav'],
    upcoming: true,
    success: true,
}
launches.set(launch.flightNumber,launch);

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

module.exports={
    getAllLaunches,
    addNewLaunch,
};