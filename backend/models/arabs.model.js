import mongoose from 'mongoose'


const arabsSchema = new mongoose.Schema({
    name:String,
    id:Number
},{
    timestamps:true
})
const Arab = mongoose.model('Arab',arabsSchema)

export default Arab