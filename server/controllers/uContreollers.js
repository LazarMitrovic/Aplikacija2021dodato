import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();


import usersModel from '../model/uModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { registerValidation, loginValidation } from './validation.js';
import jwt from 'jsonwebtoken';
//get
export const getUsers = async (req,res,next)=>{
    try {
        const users = await usersModel.find({}).exec();
        res.status(200).json(users)    
    } catch (error) {
        next(error);
    }
    
};

//post
export const createUsers = async (req,res,next)=>{
    
    try {
            //validate data before we make a user
            const { error } = registerValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message)
            

            //check if the user already in database
            const emailExist = await usersModel.findOne({ email: req.body.email});
            if (emailExist) return res.status(400).send('Email already exist');

            //crypt data
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            
            const newUser = new usersModel({ 
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                age: req.body.age,
                refreshToken: null
            });
            
             await  newUser.save();
             res.status(200).json(newUser);
           
     } catch (error) {
         next(error);
     }
};


//validate
export const validateUser = async (req,res,next)=>{

        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send({message: error.details[0].message, condition: false})
        
        const user = await usersModel.findOne({email:req.body.email}).exec();
        
        if (!user) return res.status(400).send({message: 'Email is wrong', condition: false});
      
        const validPaswword = await bcrypt.compare(req.body.password, user.password)
        if (!validPaswword) return res.status(400).send({message: 'Invalid password', condition: false});


        const data = {
            id: user._id
        }
  
        const accessToken = jwt.sign(data, process.env.ACCES_TOKEN_SECRET, { expiresIn: '300s'});
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '5h'});
        
        // user.refreshToken = '';
        // await user.save();

        refreshTokens.push(refreshToken);

        res.json({ accessToken: accessToken, refreshToken: refreshToken, condition: true})
 

    }
   


// Creates a new accessToken using the given refreshToken;
const refreshTokens = [];
export const refreshToken =  (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.json({ message: "Refresh token not found" });
    }

    // If the refresh token is valid, create a new accessToken and return it.
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (!err) {
            const accessToken = jwt.sign({ id: user.id }, process.env.ACCES_TOKEN_SECRET, {expiresIn: "10s"});
            return res.json({ success: true, accessToken });
        } else {
            return res.json({success: false, message: "Invalid refresh token"});
        }
    });

}
      
 
    


