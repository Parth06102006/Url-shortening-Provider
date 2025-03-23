import { Url } from "../models/url.model.js";
import { asyncHandler } from "../utlities/asyncHandler.js";
import { ApiError } from "../utlities/ApiError.js";
import { ApiResponse } from "../utlities/ApiResponse.js";

function generateURL()
{
    const text = 'abcdefghijklmnopqrstuvwxyz';
    const utext = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
    const number = '1234567890';
    const values = text+utext+number;
    let createURL = '';
    for(let i=0;i<values;i++)
    {
        if(createURL.length >5) return;
        createURL += values[Math.floor*(Math.random()*values.length)]
    }

    return createURL;
}

export const createShortURL = asyncHandler(async()=>
    {
        const url = req.body;
        if(!url)  
        {
            throw new ApiError(400,'Url is missing');
        }
        const shortUrl = generateURL();

        if(!shortUrl)
        {
            throw new ApiError(500,'Error creating the shortUrl');
        }

        try {
            const newUrl = await Url.create({url,shortUrl});
            if(!newUrl)
            {
                throw new ApiError(500,'An error occured');
            }
            return res.status(201).json(new ApiResponse(201,newUrl,'ShortURL created successfully'));
        } catch (error) {
            throw new ApiError(500,'Error creating the shortUrl');
        }
    })