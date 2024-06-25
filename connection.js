const mongoose = require("mongoose");

async function mongodbConnection(url){
    return await mongoose.connect(url);
}

module.exports = mongodbConnection





