const mongoose = require("mongoose")
const cardSchema = mongoose.Schema({
    img : Number ,
    name : String ,
    text : String ,
    color : String ,
    size : String ,
    rating : String ,
})
const cardModel = mongoose.model("card" , cardSchema)
module.exports = cardModel
