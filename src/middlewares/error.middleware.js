import mongoose, { Mongoose } from "mongoose";
import { ApiError } from "../utlities/ApiError.js";


export const errorHandler = (error,req,res,next)=>
    {
        if(!error instanceof ApiError) return;
        const statusCode = error.statusCode || 400;
        const message = error.message || 'An error occured';
        const errors = error.errors || [];
        const options = {statusCode,message,errors};
        return res.status(statusCode).json({...options,success:false});
    }