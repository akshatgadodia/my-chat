import mongoose from "mongoose"
const {Schema} = mongoose;

const roomSchema = new Schema({
    name : {type : String, required : true},
    id : {type : String, required : true},
    type : {type : String, required : true},
    password : {type : String, required : false},
});

export default mongoose.model("Room",roomSchema)