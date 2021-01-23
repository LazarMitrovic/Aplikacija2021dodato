import express from 'express';
import {urlencoded, json} from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import usersRoutes from './routes/api/users.js'; 


//connect with database
const databaseString = "mongodb://127.0.0.1:27017/base";
mongoose.connect(databaseString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', ()=>{
    console.log('Connect');
});

mongoose.connection.on('error', error=>{
    console.log('Error', error);
});




const app = express();
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cors());

app.use('/api/users', usersRoutes);

app.use((req,res,next)=>{
    const ststusCode = new Error('request not supported');
    error.status = 405;

    next(error);
});

app.use((error, req, res, next )=>{
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        error: {
            message: error.message,
            status: statusCode,
            stack: error.stack,
        },
    });
});
export default app;
