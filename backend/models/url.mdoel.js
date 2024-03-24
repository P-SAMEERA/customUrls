const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        unique:true,
        required:[true,'Provide shortened url']
    },
    redirectUrl:{
        type:String,
        required:[true,'Provide redirect/original url']
    },
    visitHistory:[{
        timestamps:{type:Number}
    }]
});

module.exports = mongoose.model("URL",urlSchema);