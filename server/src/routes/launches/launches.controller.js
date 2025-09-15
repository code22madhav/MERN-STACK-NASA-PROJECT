const {getAllLaunches, scheduleNewLaunch, exitsLaunchWithId, abortLaunchById} = require('../../models/launches.model');

async function httpGetLaunches(req,res){
    return res.status(200).json(await getAllLaunches());
}

async function httpaddNewLaunch(req,res){
    const launch = req.body;
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

    try {
        await scheduleNewLaunch(launch);
        return res.status(201).json(launch);
    } catch (error) {
        return res.status(500).json({error: `${error}`});
    }
}
//launches.value is not an json it gives us an iterable value in map so we can use that value to form an
//array it's like value for(const value of launches.value()){...} so we can use this value to form array

async function httpAbortLaunch(req,res){
    let flightToBeDeleted=Number(req.params.id);
    if(!await exitsLaunchWithId(flightToBeDeleted)){
        return res.status(404).json({
            error: "Launch Information not found",
        });
    }
    const abortedLaunch=await abortLaunchById(flightToBeDeleted);
    if(!abortedLaunch){
        return res.status(400).json({
            error: "launch not aborted"
        })
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports={
    httpGetLaunches,
    httpaddNewLaunch,
    httpAbortLaunch,
};