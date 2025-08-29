const {getAllLaunches} = require('../../models/launches.model');

function httpGetLaunches(req,res){
    return res.status(200).json(getAllLaunches());
}
//launches.value is not an json it gives us an iterable value in map so we can use that value to form an
//array it's like value for(const value of launches.value()){...} so we can use this value to form array

module.exports=httpGetLaunches;