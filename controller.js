import User from './userSchema.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const readData = async (req,res)=>{
    try {
        const users = await User.find({})
        res.json(users);
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

const readSingleData = async (req,res)=>{
    try {
        const incomingData = Array.isArray(req.body) ? req.body : [req.body];
        const email = incomingData[0].email || req.query.email;
        const password = incomingData[0].password || req.query.password;
        const user = await User.findOne({email});
           if(!user){
              return res.send('User Not Found');
            }
        const isMatch = await bcrypt.compare(password,user.password);
        isMatch ? res.json(user) : res.send('Incorrect Password');
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}
const addData = async (req,res)=>{
    const incomingData = Array.isArray(req.body) ? req.body : [req.body];
    try {
        incomingData.map(async(obj)=>{
        if(obj.name && obj.email && obj.password){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(obj.password, saltRounds);
        obj.password=hashedPassword;
        const newData = new User(obj);
        await newData.save();
        }
    })
     res.json('Success');

    } catch (error) {
        res.json({success:false, message:"Server Error"});
    }    
}

const updateData = (req,res)=>{
    const {id} = req.params;
    const incomingData = Array.isArray(req.body) ? req.body : [req.body];
    try {
        incomingData.map(async (obj)=>{
            if(mongoose.Types.ObjectId.isValid(id)){
                await User.findByIdAndUpdate(id,obj,{new: true})
            }
    })
    res.json('success');
    } catch (error) {
        res.json({success:false, message:"Server Error"});
    }   
}

const deleteData = (req,res)=>{
    const {id} = req.params;
    const incomingData = Array.isArray(req.body) ? req.body : [req.body];
    try {
            incomingData.map(async (obj)=>{
            if(mongoose.Types.ObjectId.isValid(id)){
                await User.findByIdAndDelete(id)
            }
    })
    res.json('success');
    } catch (error) {
        res.json({success:false, message:"Server Error"});
    }
}

const errorMsg = async (req,res)=>{
    res.send('404 Not Found');
}
export {
    readData,addData,updateData,deleteData,errorMsg,readSingleData
};
