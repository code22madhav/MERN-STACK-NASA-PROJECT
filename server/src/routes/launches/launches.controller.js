const {getAllLaunches, addNewLaunch, exitsLaunchWithId, abortLaunchById} = require('../../models/launches.model');

function httpGetLaunches(req,res){
    return res.status(200).json(getAllLaunches());
}

function httpaddNewLaunch(req,res){
    const launch=req.body;
    // validation
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
        error: "Missing required launch property",
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
        error: "Invalid launch date",
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}
//launches.value is not an json it gives us an iterable value in map so we can use that value to form an
//array it's like value for(const value of launches.value()){...} so we can use this value to form array

function httpAbortLaunch(req,res){
    let flightToBeDeleted=Number(req.params.id);
    if(!exitsLaunchWithId(flightToBeDeleted)){
        return res.status(404).json({
            error: "Launch Information not found",
        });
    }
    const abortedLaunch=abortLaunchById(flightToBeDeleted);
    return res.status(200).json(abortedLaunch);
}

module.exports={
    httpGetLaunches,
    httpaddNewLaunch,
    httpAbortLaunch,
};