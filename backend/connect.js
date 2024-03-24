const mongoose = require('mongoose');

async function db(url){

    
    return  mongoose.connect(url);
}

module.exports = {
    db,
}