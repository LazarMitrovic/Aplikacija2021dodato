import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

import express from 'express';
import { getUsers, createUsers, validateUser, refreshToken} from '../../controllers/uContreollers.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

//http://localhost:3001/api/users
router.get('/',authenticateToken,getUsers);
router.post('/',createUsers);
router.post('/login',validateUser)
router.post('/refresh', refreshToken)

function authenticateToken(req,res,next){
    let token = req.headers["authorization"];
    token = token.split(" ")[1]; //Access token

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, async (err, user) => {
        if (user) {
            req.user = user;
            next();
        } else if (err.message === "jwt expired") {
            return res.json({
                success: false,
                message: "Access token expired",
                isNewToken: true 
            });
        } else {
            return res
                 .status(403)
                 .json({ err, message: "User not authenticated",isNewToken: false });
        }
    });
}
export default router;