import mongoose from "mongoose";

//defining schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    //fields
    name:{
        type:String,       //field type
        required:true      //validator
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//creating collection
const User = mongoose.model('Users',userSchema);

export default User;

