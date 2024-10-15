import mongoose from "mongoose"

export const connectDB = async ()=>{
    const conn = await mongoose.connect('mongodb+srv://sa492284:VroqPWfqL02VX6qW@cluster0.jfljb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`Connection Successfull: ${conn.connection.host}`);
} 
