const mongoose = require('mongoose');

const launchesSchema= new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    customer: [ String ],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
    },
});

//we give the collection name as singular mongoose make it plural and lowercase for collection name eg: launches
module.exports=mongoose.model('Launch', launchesSchema);