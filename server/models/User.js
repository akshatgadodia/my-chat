import mongoose from "mongoose"
const {Schema} = mongoose;

const userSchema = new Schema({
    fullname : {type : String, required : true},
    email : {
        type : String, 
        required : true,
    },
    phonenumber: {type:Number, required:true},
    password : {type : String, required : true},
});

export default mongoose.model("User",userSchema)