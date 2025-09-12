const mongoose = require('mongoose');

const planerSchema= new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
    }
});

module.exports=mongoose.model('Planet', planerSchema);