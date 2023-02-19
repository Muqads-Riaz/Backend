const mongoose = require("mongoose")
const locationSchema = mongoose.Schema({
    currLatitude : Number ,
    currLongitude : Number ,
    category : String ,
    subCategory : String ,

})
const locationModel = mongoose.model("Requester" , locationSchema)
module.exports = locationModel