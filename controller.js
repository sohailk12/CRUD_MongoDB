import User from './userSchema.js';
import mongoose from 'mongoose';
const readData = async (req,res)=>{
    try {
        const users = await User.find({})
        res.json(users);
    } catch (error) {
        res.json({success:false, message:"Server Error"});
    }
}

const addData = async (req,res)=>{
    const incomingData = Array.isArray(req.body) ? req.body : [req.body];

    try {
        let newData=[];
        incomingData.map(async(obj)=>{
        if(obj.name && obj.email){
        newData = new User(obj);
        await newData.save();
        }
    })
     res.json(newData);

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
    readData,addData,updateData,deleteData,errorMsg
};
