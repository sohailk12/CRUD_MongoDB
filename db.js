import mongoose from "mongoose"

export const connectDB = async ()=>{
    const conn = await mongoose.connect('mongodb://localhost:27017');
    console.log(`Connection Successfull: ${conn.connection.host}`);
} 

