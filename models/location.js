const mongoose = require("mongoose")
const locationSchema = mongoose.Schema({
    curr_latitude : Number ,
    curr_longitude : Number ,
    category : String ,
    sub_category : String ,
    name : String ,

})
const locationModel = mongoose.model("Requester" , locationSchema)
module.exports = locationModel