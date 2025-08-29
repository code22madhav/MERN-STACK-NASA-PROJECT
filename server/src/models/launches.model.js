const launches= new Map();

const launch={
    flightNumber: 100,
    launchDate: new Date('22nd Jan 2026'),
    mission: "Kelper mission",
    rocket: "space X",
    target: "KE144 B",
    upcoming: true,
    success: true,
}
launches.set(launch.flightNumber,launch);

function getAllLaunches(){
    return Array.from(launches.values());
}

module.exports=getAllLaunches;