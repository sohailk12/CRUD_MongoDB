import express from 'express';
import { connectDB } from './db.js';
import router from './routes.js';
const app = express();


app.use(express.json());

app.use('/users',router);

app.listen(3000,()=>{
    connectDB();
    console.log('server running on port:3000');
})
